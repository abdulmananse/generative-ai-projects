import { task } from "@/types/todo"

export const getTasks = async () => {
  const res = await fetch(`${process.env.BASE_URL}api/todos`, { cache: 'no-store' });
  const result = await res.json();
  return result;
};

const Index = async () => {
    
  const tasks = await getTasks();

    return ( 
      <>
        {tasks.map((task : task) => (
          <div key={task.id} className="flex mb-4 items-center">
              <p className={`w-full`}>
              { task.title } { task.done && '✔'}
              </p>
          </div>
        ))}
      </>
  );
}

export default Index