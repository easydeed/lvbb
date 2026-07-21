'use server'

export type RegistrationState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Record<string, string>
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function registerPlayer(
  _prev: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const playerName = String(formData.get('playerName') ?? '').trim()
  const grade = String(formData.get('grade') ?? '').trim()
  const parentName = String(formData.get('parentName') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()

  const errors: Record<string, string> = {}
  if (!playerName) errors.playerName = 'Player name is required.'
  if (!grade) errors.grade = 'Please select a grade level.'
  if (!parentName) errors.parentName = 'Parent/guardian name is required.'
  if (!email) errors.email = 'Email is required.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'
  if (!phone) errors.phone = 'Phone number is required.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors }
  }

  // Registration captured. Connect a database (e.g. Neon) to persist these
  // signups and view them in a dashboard.
  console.log('[v0] New clinic registration:', {
    playerName,
    grade,
    parentName,
    email,
    phone,
  })

  return {
    status: 'success',
    message: `Thanks, ${parentName.split(' ')[0]}! ${playerName}'s spot is reserved. We'll email ${email} with details.`,
  }
}
