import { Education } from "../../models"

export const initEmployee = {
  id: "",
  surname: "",
  firstName: "",
  patronymic: "",
  bDay: "",
  birthPlace: "",
  mobPhone: "",
  homePhone: "",
  passportNumber: "",
  dateReceipt: "",
  placeReceipt: "",
  passportAddress: "",
  actualAddress: "",
  nationality: "",
  department: { id: "", name: "" },
  position: { id: "", name: "" },
  offerDate: "",
  educations: [] as Education[],
  family: [],
}