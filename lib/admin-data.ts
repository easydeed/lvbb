import { DATES, SESSION_CAPACITY } from '@/lib/clinic-data'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export type AdminRegistration = {
  id: string
  player_name: string
  player_age: number
  parent_name: string
  phone: string
  email: string
  player_position: string | null
  created_at: string
  sessions: string[]
}

export async function fetchAdminRegistrations(): Promise<AdminRegistration[]> {
  const { data, error } = await getSupabaseAdmin().rpc('list_clinic_registrations')

  if (error) {
    // Fallback to raw query shape if RPC unavailable
    const { data: rows, error: qErr } = await getSupabaseAdmin()
      .from('clinic_registrations')
      .select(
        `
        id,
        player_name,
        player_age,
        parent_name,
        phone,
        email,
        position,
        created_at,
        clinic_registration_sessions ( session_date )
      `,
      )
      .order('created_at', { ascending: false })

    if (qErr) throw qErr

    return (rows ?? []).map((r) => ({
      id: r.id as string,
      player_name: r.player_name as string,
      player_age: r.player_age as number,
      parent_name: r.parent_name as string,
      phone: r.phone as string,
      email: r.email as string,
      player_position: (r.position as string | null) ?? null,
      created_at: r.created_at as string,
      sessions: (
        (r.clinic_registration_sessions as { session_date: string }[] | null) ??
        []
      )
        .map((s) => s.session_date)
        .sort(),
    }))
  }

  return (data ?? []).map((r) => ({
    id: r.id as string,
    player_name: r.player_name as string,
    player_age: Number(r.player_age),
    parent_name: r.parent_name as string,
    phone: r.phone as string,
    email: r.email as string,
    player_position: (r.player_position as string | null) ?? null,
    created_at: r.created_at as string,
    sessions: (r.sessions as string[]) ?? [],
  }))
}

export function summarizeSessions(regs: AdminRegistration[]) {
  const counts: Record<string, number> = Object.fromEntries(
    DATES.map((d) => [d.id, 0]),
  )
  for (const reg of regs) {
    for (const sid of reg.sessions) {
      if (sid in counts) counts[sid] += 1
    }
  }
  return DATES.map((d) => {
    const filled = counts[d.id] ?? 0
    return {
      id: d.id,
      label: d.label,
      filled,
      capacity: SESSION_CAPACITY,
      isFull: filled >= SESSION_CAPACITY,
    }
  })
}

export function formatSessionLabels(sessionIds: string[]) {
  return sessionIds
    .map((id) => DATES.find((d) => d.id === id)?.label ?? id)
    .join(', ')
}

export function registrationsToCsv(regs: AdminRegistration[]) {
  const header = [
    'Player Name',
    'Age',
    'Parent/Guardian',
    'Phone',
    'Email',
    'Position',
    'Session Date(s)',
    'Registered At',
  ]
  const lines = regs.map((r) =>
    [
      r.player_name,
      String(r.player_age),
      r.parent_name,
      r.phone,
      r.email,
      r.player_position ?? '',
      formatSessionLabels(r.sessions),
      new Date(r.created_at).toISOString(),
    ]
      .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
      .join(','),
  )
  return [header.join(','), ...lines].join('\n')
}
