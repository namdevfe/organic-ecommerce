export interface IProductCategory {
  title: string
  slug: string
  description: string
}

export type ProductCategoryBodyTypes = Omit<IProductCategory, 'slug'>

// export interface IProductCategoryParams {
//   title?: string
//   page?: number
//   limit?: number
//   sort?: any
//   fields?: string
// }
