import React, { createContext, useReducer } from "react"
import { GlobalStateAction, globalStateReducer } from "./reducers"

export type EmployeeStateDispatcher = (action: EmployeeStateAction) => void

type FiredEmployeeType = {
  employeeId: string
  fireDate: string
  reasonId: string
}

type NewStaffTableType = {
  positionId: string
  rank: string
  salary: string
  departmentId: string
  staffDate: string
}

type ChangePositionType = {
  employeeId: string
  departmentId: string
  positionId: string
  orderDate: string
}

type UserType = {
  id: string
  login: string
  accessId: string
}

type NewEmployeeType = {
  date: string
  employee: string
  position: string
  department: string
}

type GlobalState = {
  newEmployee: NewEmployeeType
  firedEmployee: FiredEmployeeType
  newStaffTable: NewStaffTableType
  changePosition: ChangePositionType
  user: UserType 
}

export type InitialStateType = {
  globalState: GlobalState
}

const initialState = {
  globalState: {
    newEmployee: {
      date: "",
      employee: "", 
      position: "",
      department: "",
    },
    firedEmployee: {
      employeeId: "",
      fireDate: "",
      reasonId: "",
    },
    newStaffTable: {
      positionId: "",
      rank: "",
      salary: "",
      departmentId: "",
      staffDate: "",
    },
    changePosition: {
      employeeId: "",
      departmentId: "",
      positionId: "",
      orderDate: "",
    },
    user: {
      id: "",
      login: "",
      accessId: "",
    }
  },
}

const EmployeeContext = createContext<{
  state: InitialStateType
  dispatch: EmployeeStateDispatcher
}>({
  state: initialState,
  dispatch: () => null,
})

const mainReducer = (
  { globalState }: InitialStateType,
  action: EmployeeStateAction
) => ({
  globalState: globalStateReducer(globalState, action)
})

// @ts-ignore
const EmployeesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return <EmployeeContext.Provider value={{ state, dispatch }} >{children}</EmployeeContext.Provider>
}

export { EmployeeContext, EmployeesProvider }

export type EmployeeStateAction = GlobalStateAction