import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Gutter } from '../../../_components/Gutter'
import { Message } from '../../../_components/Message'
import { VerticalPadding } from '../../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

export default async function MessageComponentPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Компонент уведомлений</span>
        </p>
        <h1>Стиль уведомлений</h1>
        <br/>
      </Gutter>
      <Gutter>
        <VerticalPadding bottom="large" top="none">
          <Message message="Это обычное уведомление" />
          <br />
          <Message error="Это ошибка" />
          <br />
          <Message success="Это успех" />
          <br />
          <Message warning="Это предупреждение" />
        </VerticalPadding>
      </Gutter>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Компонент сообщения',
  description: 'Styleguide компонент сообщения.',
  openGraph: mergeOpenGraph({
    title: 'Компонент сообщения',
    url: '/styleguide/message',
  }),
}
