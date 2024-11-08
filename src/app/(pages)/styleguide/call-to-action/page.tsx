import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { CallToActionBlock } from '../../../_blocks/CallToAction'
import { Gutter } from '../../../_components/Gutter'
import { VerticalPadding } from '../../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

export default async function CallToActionPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Блок призыва к действию</span>
        </p>
        <h1>Стиль блоков призыва к действию</h1>
      </Gutter>
      <br/>
      <VerticalPadding bottom="large" top="none">
        <CallToActionBlock
          blockType="cta"
          richText={[
            {
              type: 'h4',
              children: [
                {
                  text: 'Lorem ipsum dolor sit amet',
                },
              ],
            },
            {
              children: [
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ]}
          links={[
            {
              link: {
                type: 'custom',
                label: 'Lorem ipsum dolor sit amet',
                url: '#',
                reference: null,
                appearance: 'primary',
              },
            },
          ]}
        />
        <br />
        <br />
        <CallToActionBlock
          blockType="cta"
          invertBackground
          richText={[
            {
              type: 'h4',
              children: [
                {
                  text: 'Lorem ipsum dolor sit amet',
                },
              ],
            },
            {
              children: [
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ]}
          links={[
            {
              link: {
                type: 'custom',
                label: 'Lorem ipsum dolor sit amet',
                url: '#',
                reference: null,
                appearance: 'primary',
              },
            },
          ]}
        />
      </VerticalPadding>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Блок призыва к действию',
  description: 'Styleguide блока призыва к действию',
  openGraph: mergeOpenGraph({
    title: 'Блок призыва к действию',
    url: '/styleguide/call-to-action',
  }),
}
