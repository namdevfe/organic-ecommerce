export interface IRegisterBody {
  firstName: string
  lastName: string
  email: string
  password: string
  username: string
  phone: string
}

export interface ILoginBody {
  email: string
  password: string
}
