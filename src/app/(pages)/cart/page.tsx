import React, { Fragment } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Page, Settings } from '../../../payload/payload-types'
import { staticCart } from '../../../payload/seed/cart-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { generateMeta } from '../../_utilities/generateMeta'
import { CartPage } from './CartPage'

import classes from './index.module.scss'
import {getMeUser} from "../../_utilities/getMeUser";

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Cart() {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Вы должны войти в систему, чтобы перейти в корзину.',
    )}&redirect=${encodeURIComponent(`/cart`)}`,
  })
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cart',
    })
  } catch (error) {
    console.error(error)
  }

  // if no `cart` page exists, render a static one using dummy content
  // you should delete this code once you have a cart page in the CMS
  // this is really only useful for those who are demoing this template
  if (!page) {
    page = staticCart
  }

  if (!page) {
    return notFound()
  }

  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    console.error(error)
  }

  return (
    <div className={classes.container}>
      <Gutter>
        <h3>Корзина</h3>
        <CartPage settings={settings} page={page} />
      </Gutter>
      <Blocks blocks={page?.layout} disableBottomPadding={true} />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cart',
    })
  } catch (error) {
    console.log(error)
  }

  if (!page) {
    page = staticCart
  }

  return generateMeta({ doc: page })
}
