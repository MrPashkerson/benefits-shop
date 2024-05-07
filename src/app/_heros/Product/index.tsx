import React, { Fragment } from 'react'

import { Category, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Price } from '../../_components/Price'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { title, categories, meta: { image: metaImage, description } = {} } = product

  const { title: categoryTitle } = categories as Category
  const titleToUse = categoryTitle || 'Другое'

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>Нет изображения</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName={classes.image} resource={metaImage} fill />
        )}
      </div>

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>

        <div className={classes.categoryWrapper}>
          <div className={classes.categories}>
            <p className={classes.category}>
              {titleToUse}
              <span className={classes.separator}>|</span>
            </p>
          </div>
          <p className={classes.stock}> В наличии</p>
        </div>

        <div className={classes.displayFlex}>
          <p>Стоимость: &nbsp;</p>
          <Price product={product} button={false} />
        </div>

        <div className={classes.description}>
          <h6>Описание</h6>
          <p>{description}</p>
        </div>

        <AddToCartButton product={product} className={classes.addToCartButton} />
      </div>
    </Gutter>
  )
}
