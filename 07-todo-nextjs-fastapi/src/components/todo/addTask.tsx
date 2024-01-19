"use client";

import React, { useState } from "react";
import {task} from "@/types/todo";
import toast from 'react-hot-toast';

type Props = {
  addTask: (task: task) => void;
};

const AddTask = ({ addTask }: Props) => {
    const [content, setContent] = useState("");

    const onClickAdd = async () => {
      
      const response = await fetch("api/todos", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: content }),
        cache: "no-store",
      });

      const task = await response.json();
      
      toast.success('Task successfully created');
      addTask(task);
      setContent("");
    };

    return (
      <>
        <div className="flex mt-4">
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
              placeholder="Title"
              name="title"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              />
            <button 
              className="flex-no-shrink p-2 border-2 rounded text-teal-800 border-teal hover:text-white hover:bg-teal-800"
              onClick={onClickAdd}
              >Add</button>
        </div>
      </>
  );
}

export default AddTask;