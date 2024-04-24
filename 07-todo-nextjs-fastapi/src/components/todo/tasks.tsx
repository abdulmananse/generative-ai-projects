import Task from '@/components/todo/task';
import {task} from '@/types/todo';

const Tasks = ({
              tasks,
              checkTask, 
              deleteTask 
            } : { 
              tasks : Array<task>,
              checkTask: (id: number) => void
              deleteTask: (id: number) => void
            }) => {
    return (
      <>
        <div>
            {tasks.map((task : task) => (
              <Task 
                key={task.id}
                task={task} 
                checkTask={checkTask}
                deleteTask={deleteTask}
                 />
            ))}
        </div>
      </>
  );
}

export default Tasks;