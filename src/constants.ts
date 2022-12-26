export const formatDate = "DD/MM/YYYY"

export const newEmployeeOrder = (fio: string, department: string, position: string) => {
  return `Принят/а на работу новый/ая сотрудник/ца ${fio} в отдел ${department} на должность ${position}`
}

export const newStaffTableOrder = (department: string, position: string) => {
  return `Добавлена новая штатная единица: отдел ${department}, должность ${position}`
}

export const firedEmployeeOrder = (fio: string, reason: string) => {
  return `Уволен/а сотрудник/ца ${fio} по причине: ${reason}`
}

export const changePositionOrder = (fio: string, department: string, position: string) => {
  return `Сотрудник/ца ${fio} переведен/а на должность ${position} в отдел ${department}`
}