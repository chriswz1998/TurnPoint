// GradientBackgroundContainer.tsx
// This component serves as a layout wrapper that applies a decorative gradient background 
// behind its children elements. It can be customized with a className prop for additional styling.

import React from 'react'

// GradientBackgroundContainer is a reusable layout component 
// that provides a decorative gradient background behind its children elements
const GradientBackgroundContainer = ({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`relative isolate overflow-hidden bg-white ${className}`}>
       {/* Background decorative shape */}
      <div
        aria-hidden="true"
        className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
      >
        <div
          style={{
            clipPath:
              'polygon(63.1% 29.6%, 100% 17.2%, 76.7% 3.1%, 48.4% 0.1%, 44.6% 4.8%, 54.5% 25.4%, 59.8% 49.1%, 55.3% 57.9%, 44.5% 57.3%, 27.8% 48%, 35.1% 81.6%, 0% 97.8%, 39.3% 100%, 35.3% 81.5%, 97.2% 52.8%, 63.1% 29.6%)'
          }}
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

       {/* Inserted page content (children elements) */}
      {/* If you need to modify what is rendered inside, adjust the 'children' passed to this component */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default GradientBackgroundContainer
