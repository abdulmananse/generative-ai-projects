"use client";

import {task} from "@/types/todo";
import toast from 'react-hot-toast';

const checkTask = ({ 
      task, 
      checkTask
     }: {
      task: task,
      checkTask: (id: number) => void
    }) => {

    const onClickCheck = async () => {
      
      await fetch(`api/todos/${task.id}`, {
        method: "Get",
        cache: "no-store",
      });
      toast.success('Task successfully completed');
      checkTask(task.id);
    };

    return (
      <>
        <button 
          onClick={onClickCheck}
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-800 border-green-800 hover:bg-green-800"
          >Done</button>
      </>
  );
}

export default checkTask;