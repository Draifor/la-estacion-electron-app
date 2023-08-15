export interface UserLoginType {
  username: string
  password: string
}

export type SetStateTypes =
  | ((users: UserType[]) => void)
  | ((suppliers: SupplierType[]) => void)
  | ((invoices: InvoiceType[]) => void)
  | ((ingredients: IngredientType[]) => void)

export interface DataFetchingOptions {
  from?: string
  to?: string
  setState: SetStateTypes
}

export interface UserType {
  id?: number
  name: string
  username: string
  phone?: string
  role: string
  password?: string
  newPassword?: string
  confirmPassword?: string
  isChangingPassword?: boolean
}

export interface SupplierType {
  id?: number
  name: string
  phone: string
  address: string
  type: string
}

export interface InvoiceType {
  id?: number
  supplier: string
  date: string
  dueDate: string
  description?: string
  totalAmount: number
  paidAmount: number
  paymentStatus?: string
  remainingAmount: number
  paymentMethod?: string
}

export interface IngredientType {
  id?: number
  name: string
  description: string
  price: number
  stock: number
  unit: string
}
