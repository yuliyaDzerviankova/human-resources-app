import axios from "axios"
import { formatDate } from "../../constants"
import moment from "moment"

export type EmployeeType = {
  id: string
  surname: string
  firstName: string
  patronymic: string
  bDay: string
  mobPhone: string
  homePhone: string
  passportId: number
  actualAddress: string
  birthPlace: string
  dateReceipt: string
  nationality: string
  passportAddress: string
  passportNumber: string
  placeReceipt: string
  educationId: string
  educationKind: string
  institutionName: string
  documentName: string
  finishDate: string
  speciality: string
  department: string
  position: string
  offerDate: string
}

const getStaffingTableItem = async (departmentId: string, positionId: string) => {
  try {
    const response = await axios(`http://localhost:8080/staffingTable/${departmentId}/${positionId}`)
    const staffId = response.data.id
    
    return staffId
  } catch (error) {
    throw new Error("Unable to get staffing table")
  }
}

export const getEmployeeObject = async (object: EmployeeType) => {
  const data = moment().format(formatDate)
  const sendObject = {
    surname: object.surname,
    firstName: object.firstName,
    patronymic: object.patronymic,
    bday: object.bDay,
    mobPhone: object.mobPhone,
    homePhone: object.homePhone,
    passport: {
      actualAddress: object.actualAddress,
      birthPlace: object.birthPlace,
      dateReceipt: object.dateReceipt,
      nationality: object.nationality,
      passportAddress: object.passportAddress,
      passportNumber: object.passportNumber,
      placeReceipt: object.placeReceipt,
    },
    staffingTable: await getStaffingTableItem(object.department, object.position),
    dateOfReceipt: data,
  }

  return sendObject
}

export const sendToPrint = (
  data: EmployeeType,
  positions: { id: string; name: string }[],
  departments: { id: string; name: string }[]
) => {
  const position = positions.find((item) => +item.id === +data.position) as { id: string; name: string }
  const department = departments.find((item) => +item.id === +data.department) as { id: string; name: string }
  const newEmployee = {
    employee: data.surname,
    position: position.name,
    department: department.name,
    date: data,
  }
  
  return newEmployee
}