import {task} from '@/types/todo';
import DeleteTask from '@/components/todo/deleteTask';
import CheckTask from '@/components/todo/checkTask';

  const Task = ({ 
      task,
      checkTask, 
      deleteTask 
    } : { 
      task : task,
      checkTask: (id: number) => void,
      deleteTask: (id: number) => void
    }) => {

    return (
      <>
        <div className="flex mb-4 items-center">
            <p className={`w-full`}>
              { task.title } { task.done && '✔'}
            </p>
            { task.done === false ? <CheckTask task={task} checkTask={checkTask} /> : '' }
            
            <DeleteTask task={task} deleteTask={deleteTask} />
        </div>
      </>
  );
}

export default Task;