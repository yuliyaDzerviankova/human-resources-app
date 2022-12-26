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
  staffingTable: {
    id: 0,
    discharge: 0,
    salary: 0,
    department: {
      id: "",
      nameDepartment: "",
      infoAbtDepartment: ""
    },
    positions: {
      id: "",
      positionName: ""
    },
  },
  education: initEducation,
  employeesFamily: initFamily,
  dateOfReceipt: "",
}