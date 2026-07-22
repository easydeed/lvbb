import { NextResponse } from 'next/server'
import { DATES, SESSION_CAPACITY } from '@/lib/clinic-data'
import { fetchSessionCounts } from '@/lib/session-counts'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const counts = await fetchSessionCounts()
    const sessions = DATES.map((date) => {
      const filled = Math.min(counts[date.id] ?? 0, SESSION_CAPACITY)
      return {
        id: date.id,
        label: date.label,
        month: date.month,
        day: date.day,
        suffix: date.suffix,
        filled,
        capacity: SESSION_CAPACITY,
        remaining: Math.max(SESSION_CAPACITY - filled, 0),
        isFull: filled >= SESSION_CAPACITY,
      }
    })

    return NextResponse.json({ sessions, capacity: SESSION_CAPACITY })
  } catch (error) {
    console.error('[api/sessions]', error)
    return NextResponse.json(
      { error: 'Unable to load session availability.' },
      { status: 500 },
    )
  }
}
