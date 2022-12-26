export type StaffingTable = {
  id: number
  discharge: number
  salary: number
  department: {
    id: string
    nameDepartment: string
    infoAbtDepartment: string
  }
  positions: {
    id: string
    positionName: string
  }
}