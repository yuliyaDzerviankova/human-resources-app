import React from "react"
import { faCircleExclamation, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ToastStatus } from "./notification-status"

export const icons: { [key in ToastStatus]: any } = {
  error: <FontAwesomeIcon icon={faCircleExclamation} color="#b93d30" />,
  success: <FontAwesomeIcon icon={faCircleCheck} color="#4da104" />,
}
