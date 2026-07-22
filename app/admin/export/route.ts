import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import {
  fetchAdminRegistrations,
  registrationsToCsv,
} from '@/lib/admin-data'
import { isSupabaseAdminConfigured } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY is not configured.' },
      { status: 503 },
    )
  }

  const regs = await fetchAdminRegistrations()
  const csv = registrationsToCsv(regs)
  const stamp = new Date().toISOString().slice(0, 10)

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="clinic-registrants-${stamp}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
