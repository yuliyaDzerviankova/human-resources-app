import { initEducation } from "./initEducation"
import { initPassport } from "./initPassport"
import { initFamily } from "./initFamily"

export const initEmployee = {
  id: 0,
  surname: "",
  firstName: "",
  patronymic: "",
  bday: "",
  mobPhone: "",
  homePhone: "",
  passport: initPassport,
  department: "",
  position: "",
  education: initEducation,
  employeesFamily: initFamily,
  dateOfReceipt: "",
}