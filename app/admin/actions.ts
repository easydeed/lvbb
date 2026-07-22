'use server'

import { redirect } from 'next/navigation'
import {
  clearAdminSession,
  isAdminPasswordConfigured,
  setAdminSession,
  verifyAdminPassword,
} from '@/lib/admin-auth'

export type AdminLoginState = {
  error?: string
}

export async function adminLogin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  if (!isAdminPasswordConfigured()) {
    return {
      error:
        'ADMIN_PASSWORD is not set. Add it in Vercel / .env.local and redeploy.',
    }
  }

  const password = String(formData.get('password') ?? '')
  if (!verifyAdminPassword(password)) {
    return { error: 'Incorrect password.' }
  }

  await setAdminSession()
  redirect('/admin')
}

export async function adminLogout() {
  await clearAdminSession()
  redirect('/admin')
}
