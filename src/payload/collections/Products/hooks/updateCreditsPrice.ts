import type { AfterChangeHook } from 'payload/dist/collections/config/types'

export const updateCreditsPrice: AfterChangeHook = async ({ doc, req }) => {
  const settings = await req.payload.findGlobal({
    slug: 'limits-settings',
  })

  const conversionRate = settings.conversionRate

  if (conversionRate && doc.realPrice) {
    doc.price = doc.realPrice * conversionRate
  }

  return doc
}
