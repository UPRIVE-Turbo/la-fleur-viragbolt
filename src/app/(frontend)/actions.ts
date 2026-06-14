'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Submission } from '@/payload-types'

export type SubmitFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitOrderForm(
  _prevState: SubmitFormState,
  formData: FormData,
): Promise<SubmitFormState> {
  const name = formData.get('name')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const occasion = formData.get('occasion')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !phone) {
    return { status: 'error', message: 'Kérjük, töltse ki a kötelező mezőket (név, telefonszám).' }
  }

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    await payload.create({
      collection: 'submissions',
      data: {
        name,
        phone,
        email: email || undefined,
        occasion: (occasion || undefined) as Submission['occasion'],
        message: message || undefined,
      },
    })

    return {
      status: 'success',
      message: 'Köszönjük megkeresését! Hamarosan jelentkezünk a megadott elérhetőségen.',
    }
  } catch (error) {
    console.error('Hiba az űrlap mentésekor:', error)
    return {
      status: 'error',
      message: 'Hiba történt a küldés során. Kérjük, próbálja meg újra, vagy keressen minket telefonon.',
    }
  }
}
