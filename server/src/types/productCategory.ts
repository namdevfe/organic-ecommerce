export interface IProductCategory {
  title: string
  slug: string
  description: string
}

export type ProductCategoryBodyTypes = Omit<IProductCategory, 'slug'>
