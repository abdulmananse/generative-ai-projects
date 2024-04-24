import React, { Suspense } from 'react'
import Loading from './loading'
import BookLists from '@/components/book/BookLists'

const page = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Books</h1>
       
      
      <Suspense fallback={<Loading />}>
        <BookLists />
      </Suspense>
      </div>
    </section>
  )
}

export default page