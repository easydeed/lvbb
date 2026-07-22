import { NextResponse } from 'next/server'
import { DATES, PLAYER_AGES } from '@/lib/clinic-data'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const VALID_SESSION_IDS = new Set(DATES.map((d) => d.id))
const VALID_AGES = new Set<number>(PLAYER_AGES)

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          'Registration is not configured yet. Add Supabase environment variables and redeploy.',
      },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const data = body as Record<string, unknown>
  const playerName = String(data.playerName ?? '').trim()
  const parentName = String(data.parentName ?? '').trim()
  const phone = String(data.phone ?? '').trim()
  const email = String(data.email ?? '').trim()
  const position = String(data.position ?? '').trim()
  const playerAge = Number(data.playerAge)
  const sessions = Array.isArray(data.sessions)
    ? data.sessions.map((s) => String(s)).filter(Boolean)
    : []

  const fieldErrors: Record<string, string> = {}
  if (!playerName) fieldErrors.playerName = 'Player name is required.'
  if (!VALID_AGES.has(playerAge)) {
    fieldErrors.playerAge = 'Select a player age between 8 and 12.'
  }
  if (!parentName) fieldErrors.parentName = 'Parent/guardian name is required.'
  if (!phone) fieldErrors.phone = 'Phone number is required.'
  if (!email) fieldErrors.email = 'Email is required.'
  else if (!isValidEmail(email)) fieldErrors.email = 'Enter a valid email address.'
  if (sessions.length === 0) {
    fieldErrors.sessions = 'Select at least one available session.'
  } else if (sessions.some((id) => !VALID_SESSION_IDS.has(id))) {
    fieldErrors.sessions = 'One or more selected sessions are invalid.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: 'Please fix the highlighted fields.', fieldErrors },
      { status: 400 },
    )
  }

  const uniqueSessions = [...new Set(sessions)]

  const { data: result, error } = await getSupabase().rpc('register_clinic_player', {
    p_player_name: playerName,
    p_player_age: playerAge,
    p_parent_name: parentName,
    p_phone: phone,
    p_email: email,
    p_sessions: uniqueSessions,
    p_position: position || null,
  })

  if (error) {
    const message = error.message ?? ''
    if (message.includes('SESSION_FULL')) {
      const sessionId = message.split('SESSION_FULL:')[1]?.trim()
      const label =
        DATES.find((d) => d.id === sessionId)?.label ?? 'that session'
      return NextResponse.json(
        {
          error: `${label} is full. Please choose another available session.`,
          code: 'SESSION_FULL',
          sessionId,
        },
        { status: 409 },
      )
    }

    if (message.startsWith('VALIDATION:')) {
      return NextResponse.json(
        { error: 'Please check your registration details and try again.' },
        { status: 400 },
      )
    }

    console.error('[api/register]', error)
    return NextResponse.json(
      { error: 'Unable to complete registration. Please try again.' },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    registration: result,
    message: `Thanks, ${parentName.split(' ')[0]}! ${playerName}'s spot is reserved. We'll email ${email} with details.`,
  })
}
