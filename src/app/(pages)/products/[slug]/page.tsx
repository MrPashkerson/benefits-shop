import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Product, Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { ProductHero } from '../../../_heros/Product'
import { generateMeta } from '../../../_utilities/generateMeta'
import {getMeUser} from "../../../_utilities/getMeUser";

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Product({ params: { slug } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Вы должны войти в систему, чтобы просмотреть льготу из каталога.',
    )}&redirect=${encodeURIComponent(`/products/${slug}`)}`,
  })
  const { isEnabled: isDraftMode } = draftMode()

  let product: Product | null = null

  try {
    product = await fetchDoc<Product>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!product) {
    notFound()
  }

  const { relatedProducts } = product
  console.log(relatedProducts)

  return (
    <>
      <ProductHero product={product} />
      {relatedProducts.length !== 0 && (
        <Blocks
          disableTopPadding
          blocks={[
            {
              blockType: 'relatedProducts',
              blockName: 'Вас может заинтересовать',
              relationTo: 'products',
              introContent: [
                {
                  type: 'h3',
                  children: [
                    {
                      text: 'Вас может заинтересовать',
                    },
                  ],
                },
              ],
              docs: relatedProducts,
            },
          ]}
        />
      )}
    </>
  )
}

export async function generateStaticParams() {
  try {
    const products = await fetchDocs<ProductType>('products')
    return products?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let product: Product | null = null

  try {
    product = await fetchDoc<Product>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: product })
}
