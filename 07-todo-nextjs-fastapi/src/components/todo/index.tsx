"use client";

import React, { useEffect, useState, useRef } from "react";
import TaskList from "@/components/todo/tasks"
import AddTask from "@/components/todo/addTask"
import { task } from "@/types/todo";
import {Skeleton} from "@nextui-org/react";

export default function Index() {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<task[]>([]);
    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
          initialRender.current = false;
          return;
        }

        (async function() {
          try {
            const res = await fetch("api/todos"); //, { cache: 'no-store' }
            const tasks = await res.json();
            setTasks(tasks);
            setLoading(false);
          } catch (e) {
              console.error(e);
          }
        })();
    }, []);
    
    const addTask = (task: task) => {
      setTasks([task, ...tasks]);
    };

    const checkTask = (id: number) => {
      const newTasksCheck: task[] = tasks.map((task) => {
        if (task.id === id) {
          task.done = !task.done;
        }
        return task;
      });
      setTasks(newTasksCheck);
    };

    const deleteTask = (id: number) => {
      const newTasks = tasks.filter((task) => {
        return task.id !== id;
      });
      setTasks(newTasks);
    };

    return ( 
      <>
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
          <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div className="mb-4">
              <h1 className="text-grey-darkest">Todo List</h1>
              <AddTask addTask={addTask} />
            </div>

            { loading && (
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-10 w-full rounded-lg"/>
              <Skeleton className="h-10 w-full rounded-lg"/>
              <Skeleton className="h-10 w-full rounded-lg"/>
              <Skeleton className="h-10 w-full rounded-lg"/>
              <Skeleton className="h-10 w-full rounded-lg"/>
              <Skeleton className="h-10 w-full rounded-lg"/>
              <Skeleton className="h-10 w-full rounded-lg"/>
            </div>
            ) }
                
            {/* { (tasks.length === 0 && !loading) ? <h1 className="text-grey-darkest">No tasks</h1> : '' } */}

            <TaskList 
              tasks={tasks}
              checkTask={checkTask}
              deleteTask={deleteTask}
              />
                
            </div>
          </div>
      </>
  );
}