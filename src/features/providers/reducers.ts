type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key
    }
  : {
    type: Key
    payload: Key
  }
}

export enum Types {
  SetNewEmployee = "SET_NEW_EMPLOYEE",
  SetFiredEmployee = "SET_FIRED_EMPLOYEE",
  SetChangePosition = "SET_CHANGE_POSITION",
  SetNewStaffTable = "SET_NEW_STAFF_TABLE",
  SetUser = "SET_USER",
}

type NewEmployeeType = {
  date: string
  employee: string
  position: string
  department: string
}

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

type GlobalStateType = {
  newEmployee: NewEmployeeType
  firedEmployee: FiredEmployeeType
  newStaffTable: NewStaffTableType
  changePosition: ChangePositionType
  user: UserType 
}

type GlobalStatePayload = {
  [Types.SetFiredEmployee]: {
    firedEmployee: FiredEmployeeType
  }
  [Types.SetNewStaffTable]: {
    newStaffTable: NewStaffTableType
  }
  [Types.SetChangePosition]: {
    changePosition: ChangePositionType
  }
  [Types.SetUser]: {
    user: UserType
  }
  [Types.SetNewEmployee]: {
    newEmployee: NewEmployeeType
  }
}

export type GlobalStateAction = ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>]

export const globalStateReducer = (state: GlobalStateType, action: GlobalStateAction): GlobalStateType => {
  switch (action.type) {
    case Types.SetFiredEmployee: 
      return {
        ...state,
        // @ts-ignore
        firedEmployee: action.payload.firedEmployee,
      }
      case Types.SetChangePosition: 
        return {
          ...state,
          // @ts-ignore
          changePosition: action.payload.changePosition,
        }
      case Types.SetNewStaffTable: 
        return {
          ...state,
          // @ts-ignore
          newStaffTable: action.payload.newStaffTable,
        }
      case Types.SetUser: 
        return {
          ...state,
          // @ts-ignore
          user: action.payload.user,
        }
      case Types.SetNewEmployee: 
        return {
          ...state,
          // @ts-ignore
        newEmployee: action.payload.newEmployee,
        }
    default:
      return state
  }
}