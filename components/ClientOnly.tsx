'use client'

import React, { useState, useEffect } from "react"

interface ClientOnlyProps {
   children: React.ReactNode
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
   const [hasMounted, setHasMounted] = useState(true)

   useEffect(() => {
      setHasMounted(false)
   }, []);

   if (hasMounted) return null

   return (
      <>{children}</>
   )
}


export default ClientOnly;