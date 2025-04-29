// use-mobile.tsx
// The useIsMobile hook is a custom React hook that detects whether the user's device screen 
// is below the defined mobile breakpoint (768px by default). It returns `true` if the screen 
// is considered mobile, and `false` otherwise. This is useful for implementing responsive 
// designs where different layouts or functionality are required for mobile and non-mobile screens.

import * as React from "react"

// MOBILE_BREAKPOINT is the maximum width (in pixels) to consider a screen as "mobile".
// Change this value if you want a different threshold for mobile screens.
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
   // useState to track whether the screen size is mobile or not. 
  // Initial state is undefined, as we need to determine the screen size first.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // useEffect hook to set up an event listener when the component mounts.
  React.useEffect(() => {
    // Create a media query that checks if the screen width is less than MOBILE_BREAKPOINT.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    // This function runs whenever the screen size changes.
    const onChange = () => {
      // Update isMobile state based on the window width.
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    // Add the event listener for screen size changes.
    mql.addEventListener("change", onChange)
    // Set the initial state based on the current window width.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    // Cleanup function to remove the event listener when the component unmounts.
    return () => mql.removeEventListener("change", onChange)
  }, [])
  // Return the isMobile state, ensuring it's a boolean value.
  // If isMobile is undefined (initial state), it returns false by default.
  return !!isMobile
}
