"use client";

import {task} from "@/types/todo";
import toast from 'react-hot-toast';

const deleteTask = ({ 
      task, 
      deleteTask
     }: {
      task: task,
      deleteTask: (id: number) => void
    }) => {

    const onClickDelete = async () => {
      
      await fetch(`api/todos/${task.id}`, {
        method: "Delete",
        cache: "no-store",
      });
      
      toast.success('Task successfully deleted');
      deleteTask(task.id);
    };

    return (
      <>
        <button 
          onClick={onClickDelete}
          className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-800 border-red-700 hover:text-white hover:bg-red-800"
          >Remove</button>
      </>
  );
}

export default deleteTask;