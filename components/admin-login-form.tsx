'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { adminLogin, type AdminLoginState } from '@/app/admin/actions'

const initial: AdminLoginState = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-6 font-display text-lg uppercase tracking-wide text-accent-foreground disabled:opacity-70"
    >
      {pending ? 'Checking…' : 'Enter'}
    </button>
  )
}

export function AdminLoginForm() {
  const [state, action] = useActionState(adminLogin, initial)

  return (
    <form action={action} className="mx-auto w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6 shadow-md">
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-primary"
        >
          Admin Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="min-h-12 w-full rounded-md border bg-background px-4 text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
        />
      </div>
      {state.error ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.error}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  )
}
