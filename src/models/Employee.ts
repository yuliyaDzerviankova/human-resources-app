import { Education } from "./Education"
import { Family } from "./Family"
import { Passport } from "./Passport"

export type Employee = {
  id: number
  surname: string
  firstName: string
  patronymic: string
  bday: string
  mobPhone: string
  homePhone: string
  passport: Passport
  education: Education
  department: string
  position: string
  employeesFamily: Family
  dateOfReceipt: string
}