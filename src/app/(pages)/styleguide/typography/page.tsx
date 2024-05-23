import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Gutter } from '../../../_components/Gutter'
import { VerticalPadding } from '../../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

export default async function Typography() {
  return (
    <Gutter>
      <p>
        <Link href="/styleguide">Styleguide</Link>
        {' / '}
        <span>Типографика</span>
      </p>
      <VerticalPadding bottom="large" top="none">
        {/*<br/>*/}
        <h1>Типографика</h1>
        <br/>
        <h1>H1: Lorem ipsum dolor sit amet.</h1>
        <h2>H2: Lorem ipsum dolor sit amet.</h2>
        <h3>
          H3: Lorem ipsum dolor sit amet.
        </h3>
        <h4>
          <b>
            H4: Lorem ipsum dolor sit amet.
          </b>
        </h4>
        <h5>
          H5: Lorem ipsum dolor sit amet.
        </h5>
        <h6>
          H6: Lorem ipsum dolor sit amet.
        </h6>
        <p>
          P: Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolore magna aliqua.
          Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem
          ipsum doalor sit amet in culpa qui officia deserunt consectetur adipiscing elit.
        </p>
      </VerticalPadding>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Типографика',
  description: 'Styleguide',
  openGraph: mergeOpenGraph({
    title: 'Типографика',
    url: '/styleguide/typography',
  }),
}
