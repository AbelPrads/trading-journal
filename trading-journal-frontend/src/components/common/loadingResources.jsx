import React from 'react'

export const loadingResources = () => {
  return (
    <div className="inline-flex items-center pl-2 pt-3">
      <svg className="animate-spin mr-2 h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      </svg>
      <p className="text-[10px] font-albert font-normal tracking-widest text-white">
        Loading...
      </p>
    </div>
  )
}

export default loadingResources;
