"use client";

import { create } from 'zustand'

const useCountStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }));

const Zustand = () => {
    const count = useCountStore((state : any) => state.count);
    const increment = useCountStore((state : any) => state.increment);
    const decrement = useCountStore((state : any) => state.decrement);

    return (
        <>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <p>Count: {count}</p>
                    <button 
                        className="flex-no-shrink p-2 border-2 rounded text-teal-800 border-teal hover:text-white hover:bg-teal-800"
                        onClick={increment}>
                            Increment
                    </button>
                     - 
                    <button 
                        className="flex-no-shrink p-2 border-2 rounded text-teal-800 border-teal hover:text-white hover:bg-teal-800"
                        onClick={decrement}>
                            Decrement
                    </button>
                </div>
            </div>
        </>
    )
}

export default Zustand;