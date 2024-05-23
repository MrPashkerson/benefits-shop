import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { VerticalPadding } from '../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

export default async function Typography() {
  return (
    <Gutter>
      <VerticalPadding bottom="large" top="none">
        <h1>Styleguide</h1>
        <Link href="/styleguide/typography">Типографика</Link>
        <br />
        <h2>Блоки</h2>
        <Link href="/styleguide/content-block">Контентный блок</Link>
        <br />
        <Link href="/styleguide/media-block">Медиаблок</Link>
        <br />
        <Link href="/styleguide/call-to-action">Призыв к действию</Link>
        <br />
        <h2>Компоненты</h2>
        <Link href="/styleguide/buttons">Кнопки</Link>
        <br />
        <Link href="/styleguide/message">Сообщение (уведомление)</Link>
      </VerticalPadding>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Styleguide',
  description: 'Styleguide',
  openGraph: mergeOpenGraph({
    title: 'Styleguide',
    url: '/styleguide',
  }),
}
