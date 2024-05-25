import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { cartPage } from './cart-page'
import { categoryImage1 } from './categories/beauty-category'
import { categoryImage2 } from './categories/food-category'
import { categoryImage3 } from './categories/health-category'
import { categoryImage4 } from './categories/home-category'
import { categoryImage5 } from './categories/transport-category'
import { categoryImage6 } from './categories/travel-category'
import { footerIcon2 } from './footer/linkedin'
import { footerIcon1 } from './footer/x'
import { heroImage } from './hero/hero'
import { home } from './home'
import { product1 } from './products/product-1'
import { product2 } from './products/product-2'
import { product3 } from './products/product-3'
import { product4 } from './products/product-4'
import { product5 } from './products/product-5'
import { product6 } from './products/product-6'
import { product7 } from './products/product-7'
import { product8 } from './products/product-8'
import { product9 } from './products/product-9'
import { productImage3 } from './products/public/beauty-salon'
import { productImage9 } from './products/public/fuel-costs'
import { productImage2 } from './products/public/medical-insurance'
import { productImage1 } from './products/public/mobile-network'
import { productImage8 } from './products/public/public-transport-pass'
import { productImage7 } from './products/public/sportclub-pass'
import { productImage5 } from './products/public/spotify-logo'
import { productImage6 } from './products/public/yandex-food'
import { productImage4 } from './products/public/yandex-plus'
import { productsPage } from './products-page'

const collections = ['categories', 'media', 'pages', 'products']
const globals = ['header', 'settings', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not

  payload.logger.info(`Clearing media...`)

  const mediaDir = path.resolve(__dirname, '../../media')
  if (fs.existsSync(mediaDir)) {
    fs.rmdirSync(mediaDir, { recursive: true })
  }

  payload.logger.info(`Clearing collections and globals...`)

  // clear the database
  await Promise.all([
    ...collections.map(
      async collection =>
        await payload.delete({
          collection: collection as 'media',
          where: {},
        }),
    ), // eslint-disable-line function-paren-newline
    ...collections.map(
      async collection =>
        await payload.delete({
          collection: collection as 'categories',
          where: {},
        }),
    ), // eslint-disable-line function-paren-newline
    ...collections.map(
      async collection =>
        await payload.delete({
          collection: collection as 'orders',
          where: {},
        }),
    ), // eslint-disable-line function-paren-newline
    ...collections.map(
      async collection =>
        await payload.delete({
          collection: collection as 'pages',
          where: {},
        }),
    ), // eslint-disable-line function-paren-newline
    ...collections.map(
      async collection =>
        await payload.delete({
          collection: collection as 'products',
          where: {},
        }),
    ), // eslint-disable-line function-paren-newline
    ...globals.map(
      async global =>
        await payload.updateGlobal({
          slug: global as 'header',
          data: {},
        }),
    ), // eslint-disable-line function-paren-newline
    ...globals.map(
      async global =>
        await payload.updateGlobal({
          slug: global as 'footer',
          data: {},
        }),
    ), // eslint-disable-line function-paren-newline
  ])

  payload.logger.info(`Seeding media...`)

  const [
    productImage1Doc,
    productImage2Doc,
    productImage3Doc,
    productImage4Doc,
    productImage5Doc,
    productImage6Doc,
    productImage7Doc,
    productImage8Doc,
    productImage9Doc,
  ] = await Promise.all([
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/mobile-network.png'),
      data: productImage1,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/medical-insurance.png'),
      data: productImage2,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/beauty-salon.jpg'),
      data: productImage3,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/yandex-plus.jpg'),
      data: productImage4,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/spotify-logo.png'),
      data: productImage5,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/yandex-food.png'),
      data: productImage6,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/sportclub-pass.png'),
      data: productImage7,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/public-transport-pass.jpg'),
      data: productImage8,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './products/public/fuel-costs.png'),
      data: productImage9,
    }),
  ])

  let productImage1ID = productImage1Doc.id
  let productImage2ID = productImage2Doc.id
  let productImage3ID = productImage3Doc.id
  let productImage4ID = productImage4Doc.id
  let productImage5ID = productImage5Doc.id
  let productImage6ID = productImage6Doc.id
  let productImage7ID = productImage7Doc.id
  let productImage8ID = productImage8Doc.id
  let productImage9ID = productImage9Doc.id

  if (payload.db.defaultIDType === 'text') {
    productImage1ID = `"${productImage1ID}"`
    productImage2ID = `"${productImage2ID}"`
    productImage3ID = `"${productImage3ID}"`
    productImage4ID = `"${productImage4ID}"`
    productImage5ID = `"${productImage5ID}"`
    productImage6ID = `"${productImage6ID}"`
    productImage7ID = `"${productImage7ID}"`
    productImage8ID = `"${productImage8ID}"`
    productImage9ID = `"${productImage9ID}"`
  }

  const [
    categoryImage1Doc,
    categoryImage2Doc,
    categoryImage3Doc,
    categoryImage4Doc,
    categoryImage5Doc,
    categoryImage6Doc,
  ] = await Promise.all([
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './categories/beauty-category.svg'),
      data: categoryImage1,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './categories/food-category.svg'),
      data: categoryImage2,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './categories/health-category.svg'),
      data: categoryImage3,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './categories/home-category.svg'),
      data: categoryImage4,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './categories/transport-category.svg'),
      data: categoryImage5,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './categories/travel-category.svg'),
      data: categoryImage6,
    }),
  ])

  let categoryImage1ID = categoryImage1Doc.id
  let categoryImage2ID = categoryImage2Doc.id
  let categoryImage3ID = categoryImage3Doc.id
  let categoryImage4ID = categoryImage4Doc.id
  let categoryImage5ID = categoryImage5Doc.id
  let categoryImage6ID = categoryImage6Doc.id

  if (payload.db.defaultIDType === 'text') {
    categoryImage1ID = `${categoryImage1ID}`
    categoryImage2ID = `${categoryImage2ID}`
    categoryImage3ID = `${categoryImage3ID}`
    categoryImage4ID = `${categoryImage4ID}`
    categoryImage5ID = `${categoryImage5ID}`
    categoryImage6ID = `${categoryImage6ID}`
  }

  const [heroImageDoc] = await Promise.all([
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './hero/hero.svg'),
      data: heroImage,
    }),
  ])

  let heroImageDocID = heroImageDoc.id

  if (payload.db.defaultIDType === 'text') {
    heroImageDocID = `"${heroImageDocID}"`
  }

  const [footerIconX, footerIconLinkedIn] = await Promise.all([
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './footer/x.svg'),
      data: footerIcon1,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, './footer/linkedin.svg'),
      data: footerIcon2,
    }),
  ])

  let footerIconXID = footerIconX.id
  let footerIconLinkedInID = footerIconLinkedIn.id

  if (payload.db.defaultIDType === 'text') {
    footerIconXID = `${footerIconXID}`
    footerIconLinkedInID = `${footerIconLinkedInID}`
  }

  payload.logger.info(`Seeding categories...`)

  const [
    HealthCategory,
    TransportCategory,
    HouseCategory,
    FoodCategory,
    TravelCategory,
    BeautyCategory,
  ] = await Promise.all([
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Здоровье',
        media: categoryImage3ID,
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Транспорт',
        media: categoryImage5ID,
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Дом и быт',
        media: categoryImage4ID,
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Еда',
        media: categoryImage2ID,
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Путешествия',
        media: categoryImage6ID,
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Красота',
        media: categoryImage1ID,
      },
    }),
  ])

  payload.logger.info(`Seeding products...`)

  // Do not create product with `Promise.all` because we want the products to be created in order
  // This way we can sort them by `createdAt` or `publishedOn` and they will be in the expected order
  const product1Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product1, categories: HouseCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage1ID,
      ),
    ),
  })

  const product2Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product2, categories: HealthCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage2ID,
      ),
    ),
  })

  const product3Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product3, categories: BeautyCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage3ID,
      ),
    ),
  })

  const product4Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product4, categories: HouseCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage4ID,
      ),
    ),
  })

  const product5Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product5, categories: HouseCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage5ID,
      ),
    ),
  })

  const product6Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product6, categories: FoodCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage6ID,
      ),
    ),
  })

  const product7Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product7, categories: HealthCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage7ID,
      ),
    ),
  })

  const product8Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product8, categories: TransportCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage8ID,
      ),
    ),
  })

  const product9Doc = await payload.create({
    collection: 'products',
    data: JSON.parse(
      JSON.stringify({ ...product9, categories: TransportCategory.id }).replace(
        /"\{\{PRODUCT_IMAGE\}\}"/g,
        productImage9ID,
      ),
    ),
  })

  // update each product with related products

  await Promise.all([
    await payload.update({
      collection: 'products',
      id: product1Doc.id,
      data: {
        relatedProducts: [product4Doc.id, product5Doc.id],
      },
    }),
    await payload.update({
      collection: 'products',
      id: product4Doc.id,
      data: {
        relatedProducts: [product1Doc.id, product5Doc.id],
      },
    }),
    await payload.update({
      collection: 'products',
      id: product5Doc.id,
      data: {
        relatedProducts: [product4Doc.id, product1Doc.id],
      },
    }),
    await payload.update({
      collection: 'products',
      id: product2Doc.id,
      data: {
        relatedProducts: [product7Doc.id],
      },
    }),
    await payload.update({
      collection: 'products',
      id: product7Doc.id,
      data: {
        relatedProducts: [product2Doc.id],
      },
    }),
    await payload.update({
      collection: 'products',
      id: product8Doc.id,
      data: {
        relatedProducts: [product9Doc.id],
      },
    }),
    await payload.update({
      collection: 'products',
      id: product9Doc.id,
      data: {
        relatedProducts: [product8Doc.id],
      },
    }),
  ])

  payload.logger.info(`Seeding products page...`)

  const productsPageDoc = await payload.create({
    collection: 'pages',
    data: productsPage,
  })

  let productsPageID = productsPageDoc.id

  if (payload.db.defaultIDType === 'text') {
    productsPageID = `"${productsPageID}"`
  }

  payload.logger.info(`Seeding home page...`)

  const homePageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/"\{\{HERO_IMAGE\}\}"/g, heroImageDocID)
        .replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, productsPageID),
    ),
  })

  payload.logger.info(`Seeding cart page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(cartPage).replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, productsPageID),
    ),
  })

  payload.logger.info(`Seeding settings...`)

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      productsPage: productsPageDoc.id,
    },
  })

  payload.logger.info(`Seeding header...`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: homePageDoc.id,
            },
            label: 'Главная',
          },
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: productsPageDoc.id,
            },
            label: 'Каталог',
          },
        },
      ],
    },
  })

  payload.logger.info(`Seeding footer...`)

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      copyright: '© Все права защищены 2024 Магазин Льгот',
      navItems: [
        {
          link: {
            type: 'custom',
            newTab: true,
            url: 'https://x.com/',
            icon: footerIconXID,
            label: 'X',
          },
        },
        {
          link: {
            type: 'custom',
            newTab: true,
            url: 'https://linkedin.com/',
            icon: footerIconLinkedInID,
            label: 'LinkedIn',
          },
        },
      ],
    },
  })

  payload.logger.info(`Seeding limits-settings...`)

  await payload.updateGlobal({
    slug: 'limits-settings',
    data: {
      formula:
        'min(maxCredits, minCredits + (minCredits * Коэффициент квалификации) + (minCredits * Коэффициент стажа))',
      conversionRate: 1,
      minBudget: 300,
      maxBudget: 750,

      qualificationCoefficients: [
        {
          coefficient: 0.1,
          qualification: 'basicGeneralEducation',
          id: '66503bf4af28e8f914b06ef2',
        },
        {
          qualification: 'secondarySchool',
          coefficient: 0.2,
          id: '66503bfdaf28e8f914b06ef3',
        },
        {
          qualification: 'lowerPostSecondaryVocationalEducation',
          coefficient: 0.3,
          id: '66503bffaf28e8f914b06ef4',
        },
        {
          qualification: 'incompleteHigherEducation',
          coefficient: 0.4,
          id: '66503c01af28e8f914b06ef5',
        },
        {
          qualification: 'bachelorsDegree',
          coefficient: 0.5,
          id: '66503c02af28e8f914b06ef6',
        },
        {
          qualification: 'specialistDegree',
          coefficient: 0.6,
          id: '66503c04af28e8f914b06ef7',
        },
        {
          qualification: 'mastersDegree',
          coefficient: 0.7,
          id: '66503c05af28e8f914b06ef8',
        },
        {
          qualification: 'postgraduateDegreeOrPhD',
          coefficient: 0.8,
          id: '66503c06af28e8f914b06ef9',
        },
        {
          qualification: 'secondHigherDegree',
          coefficient: 0.8,
          id: '66503c08af28e8f914b06efa',
        },
      ],
      experienceCoefficients: [
        {
          experienceRange: '1 month',
          coefficient: 0.1,
          id: '66503c52af28e8f914b06efc',
        },
        {
          experienceRange: '3 months',
          coefficient: 0.2,
          id: '66503c53af28e8f914b06efd',
        },
        {
          experienceRange: '6 months',
          coefficient: 0.4,
          id: '66503c55af28e8f914b06efe',
        },
        {
          experienceRange: '1 year',
          coefficient: 0.5,
          id: '66503c61af28e8f914b06eff',
        },
        {
          experienceRange: '2 years',
          coefficient: 0.75,
          id: '66503c67af28e8f914b06f00',
        },
        {
          experienceRange: '5 years',
          coefficient: 1,
          id: '66503c6aaf28e8f914b06f01',
        },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
}
