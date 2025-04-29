// use-toast.tsx
// This file provides a custom toast notification system inspired by the react-hot-toast library. 
// It allows displaying notifications (toasts) with optional actions like updates, dismissals, 
// and automatic removal after a set delay. The `useToast` hook and `toast` function allow for easy 
// integration and management of toasts across the application.

"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast" // Replace with the correct path to your Toast component

// Define constants for the maximum number of toasts displayed and the delay before removal
const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000 // Set a large value for the delay (in ms)

// Define the structure of a Toast object, including optional title, description, and actions.
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Define the action types for managing toasts
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// Simple counter to generate unique toast IDs
let count = 0

// Function to generate unique IDs for toasts
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Define possible actions for the reducer
type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// Define the state shape for managing toasts
interface State {
  toasts: ToasterToast[]
}

// Maintain a map of toast timeouts to manage automatic removal
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Function to add a toast ID to the removal queue and automatically remove it after the specified delay
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// The reducer function to handle toast actions like adding, updating, dismissing, or removing a toast
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT), // Limit the number of toasts
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // Close the toast
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      // Remove a toast from the state based on the toastId
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [], // Clear all toasts if no toastId is provided
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId), // Filter out the removed toast
      }
  }
}

// Listeners to track state changes and re-render components that are using the state
const listeners: Array<(state: State) => void> = []

// Initial state with no toasts
let memoryState: State = { toasts: [] }

// Dispatch function to trigger state changes based on actions
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Type definition for a Toast object, excluding the "id"
type Toast = Omit<ToasterToast, "id">

// The toast function is used to add a new toast, update an existing one, or dismiss a toast
function toast({ ...props }: Toast) {
  const id = genId() // Generate a unique ID for each toast

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Add the new toast to the state
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true, // Initially open the toast
      onOpenChange: (open) => {
        if (!open) dismiss() // If toast is closed, dismiss it
      },
    },
  })

  return {
    id: id, // Return the toast ID
    dismiss, // Function to manually dismiss the toast
    update, // Function to update the toast
  }
}

// The useToast hook provides access to the current state of toasts and methods to manage them
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState) // Register listener to state changes
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1) // Unregister listener when component unmounts
      }
    }
  }, [state])

  return {
    ...state, // Return the current state
    toast, // Provide the toast function
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}
// Export the useToast hook and toast function
export { useToast, toast }
