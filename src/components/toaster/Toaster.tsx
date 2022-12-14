import React from "react"
import { toast } from "react-hot-toast"
import { ToastStatus } from "./notification-status"

import { Toast as ToastInstance } from "./toast"

export const PopToast = (title: string, description: string, status: ToastStatus) => {
  toast((toastInstance) => (
    <ToastInstance
      description={description}
      status={status}
      title={title}
      onClose={() => toast.dismiss(toastInstance.id)}
    ></ToastInstance>
  ))
}