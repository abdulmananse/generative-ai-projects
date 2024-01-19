// import TaskList from "@/components/todo/tasks"
// import AddTask from "@/components/todo/addTask"

// export const getTasks = async () => {
  
//   const res = await fetch(`${process.env.BASE_URL}api/todos`, { cache: 'no-store' });
//   const result = await res.json();
//   return result;
// };

// export default async function Index() {
//     const tasks = await getTasks();
//     // console.log('tasks', tasks);
  
//     return (
//       <>
//         <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
//             <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
//                   <div className="mb-4">
//                       <h1 className="text-grey-darkest">Todo List</h1>
//                       <AddTask />
//                   </div>
//                   <TaskList tasks={tasks} />
//               </div>
//           </div>
//       </>
//   );
// }