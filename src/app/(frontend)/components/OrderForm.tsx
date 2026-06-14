'use client'

import { useActionState } from 'react'
import { CheckCircle, PaperPlaneTilt, Spinner } from '@phosphor-icons/react/dist/ssr'
import { submitOrderForm, type SubmitFormState } from '../actions'

const initialState: SubmitFormState = { status: 'idle' }

const OCCASIONS = [
  { value: '', label: 'Milyen alkalomra keres virágot?' },
  { value: 'birthday', label: 'Születésnap / Névnap' },
  { value: 'wedding', label: 'Esküvő' },
  { value: 'anniversary', label: 'Évforduló' },
  { value: 'sympathy', label: 'Megemlékezés / Részvét' },
  { value: 'just-because', label: 'Csak úgy, meglepetésként' },
  { value: 'other', label: 'Egyéb' },
]

export function OrderForm() {
  const [state, formAction, pending] = useActionState(submitOrderForm, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex items-start gap-4 rounded-2xl border border-fresh-green/20 bg-white p-6">
        <CheckCircle size={32} weight="fill" className="shrink-0 text-fresh-green" />
        <div>
          <h4 className="mb-1 font-serif text-xl text-deep-green">Köszönjük megkeresését!</h4>
          <p className="text-sm text-deep-green/70">{state.message}</p>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-8">
      {state.status === 'error' && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
      )}

      <div>
        <label htmlFor="name" className="sr-only">
          Név
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Teljes név"
          className="w-full border-b border-deep-green/30 bg-transparent py-3 text-lg text-deep-green placeholder-deep-green/50 outline-none transition-all focus:border-b-2 focus:border-fresh-green"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="sr-only">
            Telefonszám
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="Telefonszám"
            className="w-full border-b border-deep-green/30 bg-transparent py-3 text-lg text-deep-green placeholder-deep-green/50 outline-none transition-all focus:border-b-2 focus:border-fresh-green"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email cím
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email cím (opcionális)"
            className="w-full border-b border-deep-green/30 bg-transparent py-3 text-lg text-deep-green placeholder-deep-green/50 outline-none transition-all focus:border-b-2 focus:border-fresh-green"
          />
        </div>
      </div>

      <div>
        <label htmlFor="occasion" className="sr-only">
          Milyen alkalomra?
        </label>
        <select
          id="occasion"
          name="occasion"
          required
          defaultValue=""
          className="w-full cursor-pointer border-b border-deep-green/30 bg-transparent py-3 text-lg text-deep-green outline-none transition-all focus:border-b-2 focus:border-fresh-green"
        >
          {OCCASIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Üzenet vagy kívánság
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Írja le elképzelését (színek, virágfajták, költségkeret...)"
          className="w-full resize-none border-b border-deep-green/30 bg-transparent py-3 text-lg text-deep-green placeholder-deep-green/50 outline-none transition-all focus:border-b-2 focus:border-fresh-green"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-deep-green px-10 py-5 text-lg font-medium text-cream transition-all hover:bg-fresh-green disabled:opacity-70 sm:w-auto"
      >
        {pending ? (
          <>
            <Spinner size={20} className="animate-spin" />
            <span>Küldés folyamatban...</span>
          </>
        ) : (
          <>
            <span>Ajánlatkérés elküldése</span>
            <PaperPlaneTilt size={20} weight="bold" />
          </>
        )}
      </button>
    </form>
  )
}
