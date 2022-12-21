import { Education } from "./Education"
import { Family } from "./Family"

export type Employee = {
  id: string
  surname: string
  firstName: string
  patronymic: string
  bDay: string
  birthPlace: string
  mobPhone: string
  homePhone: string
  passportNumber: string
  dateReceipt: string
  placeReceipt: string
  passportAddress: string
  actualAddress: string
  nationality: string
  department: { id: string, name: string }
  position: { id: string, name: string }
  offerDate: string
  educations: Education[]
  family: Family[]
}