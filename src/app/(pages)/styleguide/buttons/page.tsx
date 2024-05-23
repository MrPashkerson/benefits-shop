import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { CallToActionBlock } from '../../../_blocks/CallToAction'
import { Button } from '../../../_components/Button'
import { Gutter } from '../../../_components/Gutter'
import { VerticalPadding } from '../../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

export default async function ButtonsPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Кнопки</span>
        </p>
        <h1>Стиль кнопок</h1>
      </Gutter>
      <Gutter>
        <VerticalPadding bottom="large" top="none">
          {/*<Button label="По умолчанию" appearance="default" />*/}
          <br />
          <Button label="Основная кнопка" appearance="primary" />
          <br /> <br />
          <Button label="Второстепенная кнопка" appearance="secondary" />
        </VerticalPadding>
      </Gutter>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Кнопки',
  description: 'Styleguide кнопки',
  openGraph: mergeOpenGraph({
    title: 'Кнопки',
    url: '/styleguide/buttons',
  }),
}
