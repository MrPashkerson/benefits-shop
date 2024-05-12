import { webpackBundler } from '@payloadcms/bundler-webpack' // bundler-import
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import { payloadCloud } from '@payloadcms/plugin-cloud'
import redirects from '@payloadcms/plugin-redirects'
import seoPlugin from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import { slateEditor } from '@payloadcms/richtext-slate' // editor-import
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import Categories from './collections/Categories'
import { Media } from './collections/Media'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'
import Products from './collections/Products'
import Users from './collections/Users'
import beforeDashboard from './components/BeforeDashboard'
import CustomIcon from './components/CustomIcon'
import CustomLogo from './components/CustomLogo'
import { checkPages } from './endpoints/check-pages-collection'
import { seed } from './endpoints/seed'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import {checkCredits} from "./endpoints/check-credits";

const generateTitle: GenerateTitle = () => {
  return 'Магазин Льгот'
}

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(), // bundler-config
    components: {
      beforeDashboard: [beforeDashboard],
      graphics: {
        Logo: CustomLogo,
        Icon: CustomIcon,
      },
    },
    meta: {
      favicon: '../public/favicon.ico',
    },
    dateFormat: 'dd-LL-yyyy HH:mm',
    webpack: config => {
      return {
        ...config,
        resolve: {
          fallback: {
            util: require.resolve('util/'),
          },
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            dotenv: path.resolve(__dirname, './dotenv.js'),
            [path.resolve(__dirname, 'endpoints/check-pages-collection.ts')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/check-credits')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/seed')]: mockModulePath,
            express: mockModulePath,
          },
        },
      }
    },
  },
  editor: slateEditor({}), // editor-config
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Pages, Products, Orders, Media, Categories, Users],
  globals: [Settings, Header, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    {
      path: '/check-pages',
      method: 'get',
      handler: checkPages,
    },
    {
      path: '/check-credits',
      method: 'post',
      handler: checkCredits,
    },
    {
      path: '/seed',
      method: 'get',
      handler: seed,
    },
  ],
  plugins: [
    redirects({
      collections: ['pages', 'products'],
    }),
    seoPlugin({
      collections: ['pages', 'products'],
      generateTitle,
      uploadsCollection: 'media',
      fieldOverrides: {
        title: {
          label: 'Название',
        },
        description: {
          label: 'Описание',
        },
        image: {
          label: 'Meta-изображение',
        },
      },
    }),
    payloadCloud(),
  ],
})
