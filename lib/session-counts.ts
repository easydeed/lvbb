import { DATES, SESSION_CAPACITY } from '@/lib/clinic-data'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'

export type SessionAvailability = {
  id: string
  label: string
  month: string
  day: string
  suffix: string
  filled: number
  capacity: number
  remaining: number
  isFull: boolean
}

export type SessionCountsMap = Record<string, number>

export async function fetchSessionCounts(): Promise<SessionCountsMap> {
  const counts: SessionCountsMap = Object.fromEntries(DATES.map((d) => [d.id, 0]))

  if (!isSupabaseConfigured()) {
    return counts
  }

  const { data, error } = await getSupabase().rpc('get_clinic_session_counts')

  if (error) {
    console.error('[sessions] Failed to load counts:', error.message)
    return counts
  }

  for (const row of data ?? []) {
    if (row.session_date in counts) {
      counts[row.session_date] = Number(row.filled) || 0
    }
  }

  return counts
}

export function buildAvailability(
  counts: SessionCountsMap,
): SessionAvailability[] {
  return DATES.map((date) => {
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
}

export async function getSessionAvailability(): Promise<SessionAvailability[]> {
  const counts = await fetchSessionCounts()
  return buildAvailability(counts)
}
