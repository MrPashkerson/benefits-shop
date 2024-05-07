import { Button } from '../_components/Button'
import { Gutter } from '../_components/Gutter'
import { VerticalPadding } from '../_components/VerticalPadding'

import classes from './not-found.module.scss'

export default function NotFound() {
  return (
    <Gutter className={classes.notFoundPage}>
      <VerticalPadding top="none" bottom="large">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p>Страница не найдена.</p>
        <Button href="/" label="На главную" appearance="primary" />
      </VerticalPadding>
    </Gutter>
  )
}
