import React, {Suspense} from 'react'
import TaskList from '@/components/server-todo';
import Loading from './loading';

const Todos = async () => {
    
    return (
        <>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                  <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List</h1>
                        <div className="flex mt-4">
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                                placeholder="Title"
                                name="title"
                                />
                            <button className="flex-no-shrink p-2 border-2 rounded text-teal-800 border-teal hover:text-white hover:bg-teal-800">Add</button>
                        </div>
                  </div>
                  <Suspense fallback={<Loading />}>
                    <TaskList />
                  </Suspense>
                    
            </div>
            </div>
        </>
        
    )
}

export default Todos