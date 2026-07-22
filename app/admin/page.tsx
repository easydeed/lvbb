import type { Metadata } from 'next'
import Link from 'next/link'
import { adminLogout } from '@/app/admin/actions'
import { AdminLoginForm } from '@/components/admin-login-form'
import {
  isAdminAuthenticated,
  isAdminPasswordConfigured,
} from '@/lib/admin-auth'
import {
  fetchAdminRegistrations,
  formatSessionLabels,
  summarizeSessions,
} from '@/lib/admin-data'
import { isSupabaseAdminConfigured } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin | Clinic Registrants',
  robots: { index: false, follow: false },
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export default async function AdminPage() {
  const authed = await isAdminAuthenticated()

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F7F5EC] px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07917]">
            Restricted
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase text-[#132419]">
            Clinic Admin
          </h1>
          <p className="mt-2 text-sm text-[#123C27]/90">
            Enter the admin password to view registrants.
          </p>
          {!isAdminPasswordConfigured() ? (
            <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
              ADMIN_PASSWORD is not configured on this deployment.
            </p>
          ) : null}
          <div className="mt-8">
            <AdminLoginForm />
          </div>
          <p className="mt-8 text-sm">
            <Link href="/" className="text-[#123C27] underline-offset-4 hover:underline">
              ← Back to site
            </Link>
          </p>
        </div>
      </div>
    )
  }

  if (!isSupabaseAdminConfigured()) {
    return (
      <div className="min-h-screen bg-[#F7F5EC] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-6">
          <h1 className="font-display text-3xl uppercase text-[#132419]">
            Missing service role key
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Add <code className="rounded bg-muted px-1">SUPABASE_SERVICE_ROLE_KEY</code>{' '}
            as a server-only env var and redeploy.
          </p>
          <form action={adminLogout} className="mt-6">
            <button type="submit" className="text-sm font-semibold text-[#E07917]">
              Log out
            </button>
          </form>
        </div>
      </div>
    )
  }

  const registrations = await fetchAdminRegistrations()
  const sessionSummary = summarizeSessions(registrations)

  return (
    <div className="min-h-screen bg-[#F7F5EC] text-[#132419]">
      <header className="border-b border-[#123C27]/20 bg-[#132419] text-[#F7F5EC]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E07917]">
              Admin
            </p>
            <h1 className="font-display text-2xl uppercase sm:text-3xl">
              Clinic Registrants
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/admin/export"
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#E07917] px-4 text-sm font-bold uppercase tracking-wide text-white"
            >
              Download CSV
            </a>
            <form action={adminLogout}>
              <button
                type="submit"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/30 px-4 text-sm font-semibold uppercase tracking-wide"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <section className="rounded-xl border border-[#123C27]/15 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-[#123C27]">
            Summary
          </p>
          <p className="mt-2 text-2xl font-display uppercase text-[#132419]">
            {registrations.length} total registrant
            {registrations.length === 1 ? '' : 's'}
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sessionSummary.map((s) => (
              <li
                key={s.id}
                className="rounded-md border border-[#123C27]/10 bg-[#F7F5EC] px-3 py-2 text-sm"
              >
                <span className="font-semibold">{s.label}</span>
                <span className="ml-2 text-[#123C27]/80">
                  {s.filled} / {s.capacity}
                  {s.isFull ? (
                    <span className="ml-2 font-bold text-red-700">FULL</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 overflow-x-auto rounded-xl border border-[#123C27]/15 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#123C27] text-[#F7F5EC]">
              <tr>
                <th className="px-3 py-3 font-semibold">Player Name</th>
                <th className="px-3 py-3 font-semibold">Age</th>
                <th className="px-3 py-3 font-semibold">Parent/Guardian</th>
                <th className="px-3 py-3 font-semibold">Phone</th>
                <th className="px-3 py-3 font-semibold">Email</th>
                <th className="px-3 py-3 font-semibold">Session Date(s)</th>
                <th className="px-3 py-3 font-semibold">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                    No registrations yet.
                  </td>
                </tr>
              ) : (
                registrations.map((r) => (
                  <tr key={r.id} className="border-t border-[#123C27]/10 odd:bg-[#F7F5EC]/60">
                    <td className="px-3 py-3 font-medium">{r.player_name}</td>
                    <td className="px-3 py-3">{r.player_age}</td>
                    <td className="px-3 py-3">{r.parent_name}</td>
                    <td className="px-3 py-3 whitespace-nowrap">{r.phone}</td>
                    <td className="px-3 py-3">{r.email}</td>
                    <td className="px-3 py-3">{formatSessionLabels(r.sessions)}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      {formatWhen(r.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <p className="mt-6 text-sm text-[#123C27]/70">
          <Link href="/" className="font-semibold underline-offset-4 hover:underline">
            ← Back to site
          </Link>
        </p>
      </main>
    </div>
  )
}
