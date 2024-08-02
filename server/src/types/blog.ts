export interface IBlog {
  title: string
  slug?: string
  description: string
  views?: number
  coverImage?: string
  likes?: any[]
  dislikes?: any[]
  author?: string
}
