import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'lvbb_admin_session'

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    throw new Error('ADMIN_PASSWORD is not configured')
  }
  return password
}

export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD)
}

function signSession() {
  const password = getAdminPassword()
  return createHmac('sha256', password).update('lvbb-admin-ok').digest('hex')
}

export function verifyAdminPassword(input: string) {
  const expected = getAdminPassword()
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function isAdminAuthenticated() {
  if (!isAdminPasswordConfigured()) return false
  const jar = await cookies()
  const token = jar.get(ADMIN_COOKIE)?.value
  if (!token) return false
  const expected = signSession()
  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function setAdminSession() {
  const jar = await cookies()
  jar.set(ADMIN_COOKIE, signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12, // 12 hours
  })
}

export async function clearAdminSession() {
  const jar = await cookies()
  jar.delete(ADMIN_COOKIE)
}
