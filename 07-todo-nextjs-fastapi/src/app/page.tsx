import { Suspense } from 'react'
import Todo from "@/components/todo"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<p>Loading feed...</p>}>
        <Todo />
      </Suspense>
    </main>
  )
}
