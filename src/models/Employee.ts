import { Education } from "./Education"
import { Family } from "./Family"
import { Passport } from "./Passport"
import { StaffingTable } from "./StaffingTable"

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
  staffingTable: StaffingTable
  employeesFamily: Family
  dateOfReceipt: string
}