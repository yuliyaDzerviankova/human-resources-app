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
  department: string
  position: string
  offerDate: string
  educations: Education[]
  family: Family[]
}