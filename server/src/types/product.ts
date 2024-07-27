import { Types } from 'mongoose'

export interface IRating {
  star: number
  postedBy: any
  comment: string
}

export interface IProduct {
  title: string
  slug: string
  description: string
  brand: string
  category: any
  price: number
  quantity: number
  sold: number
  images: Types.Array<string>
  ratings: IRating[]
  totalRatings: number
}

export type ProductBodyTypes = Omit<IProduct, 'category' | 'sold' | 'images' | 'ratings' | 'totalRatings'>
