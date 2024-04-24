import React from 'react'
import {Skeleton} from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Skeleton className="h-10 w-full rounded-lg"/>
      <Skeleton className="h-10 w-full rounded-lg"/>
      <Skeleton className="h-10 w-full rounded-lg"/>
      <Skeleton className="h-10 w-full rounded-lg"/>
      <Skeleton className="h-10 w-full rounded-lg"/>
      <Skeleton className="h-10 w-full rounded-lg"/>
      <Skeleton className="h-10 w-full rounded-lg"/>
    </div>
  )
}

export default Loading