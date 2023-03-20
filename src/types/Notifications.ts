import { Enums } from "../utils/Enums"

export type INotification = {
  key:React.Key
  message:string|React.ReactNode
  title?:string|React.ReactNode
  autoDismiss?:number
  type?:Enums.Color
}