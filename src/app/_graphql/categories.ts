export const PRODUCT_CATEGORIES = `categories {
  title
  id
}`

export const CATEGORIES = `
  query Categories {
    Categories(limit: 300) {
      docs {
        id
        title
        media {
          alt
          width
          height
          url
        }
      }
    }
  }
`
