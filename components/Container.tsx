'use client'
import React, { useState, useEffect } from "react"

interface IProps {
   children: React.ReactNode;
   style?: string
}


const Container = ({ children, style }: IProps) => {
   return (
      <div className={`w-full lg:w-[1200px] mx-auto px-2 ${style}`} >{children}</div>
   )
}

export default Container
