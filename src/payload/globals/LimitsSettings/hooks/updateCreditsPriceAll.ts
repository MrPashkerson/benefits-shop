import type { GlobalAfterChangeHook } from 'payload/types'

export const updateCreditsPriceAll: GlobalAfterChangeHook = async ({ req, doc, previousDoc }) => {
  if (doc.conversionRate === previousDoc.conversionRate) {
    return
  }
  const conversionRate = doc.conversionRate

  const products = await req.payload.find({
    collection: 'products',
    limit: 0,
  })

  const updatePromises = products.docs.map(async product => {
    if (product.realPrice) {
      const newPrice = product.realPrice * conversionRate
      await req.payload.update({
        collection: 'products',
        id: product.id,
        data: {
          price: newPrice,
        },
      })
    }
  })

  await Promise.all(updatePromises)
}
