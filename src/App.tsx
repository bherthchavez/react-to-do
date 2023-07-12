import { useState, useEffect } from "react";
import {
  MdAdd,
  MdDeleteOutline,
  MdModeEdit,
  MdSave,
  MdOutlineClose,
} from "react-icons/md";
import { ToDo } from "./types/Notes";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  addTask,
  deleteTask,
  fetchTodo,
  updateTask,
  updateCompleted,
} from "./todoSlice";

function App() {
  const dispatch = useAppDispatch();

  const { todo: tasks } = useAppSelector((state) => state.toDo);

  const [fetchTask, setFetchTask] = useState<boolean>(false);

  useEffect(() => {
    fetchTask ? "refetch" : "refetch";
    void dispatch(fetchTodo());
  }, [dispatch, fetchTask]);

  const initialNote: ToDo = {
    id: "",
    task: "",
    completed: false,
  };
  const [task, setTask] = useState<ToDo>(initialNote);

  const reFetched = () => {
    setFetchTask((prev) => !prev);
  };

  const handleCompletTask = (
    id: string,
    task: string,
    completed: boolean
  ): void => {
    dispatch(updateCompleted({ id, task, completed: !completed }));
    setTimeout(reFetched, 50);
  };

  const handleDeleteTask = (id: string): void => {
    dispatch(deleteTask({ id }));
    setTimeout(reFetched, 50);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (task.id) {
      dispatch(
        updateTask({ id: task.id, task: task.task, completed: task.completed })
      );
    } else {
      dispatch(addTask({ task: task.task, completed: false }));
    }
    setTask({ id: "", task: "", completed: false });
    setTimeout(reFetched, 50);
  };

  const renderTasks = () =>
    tasks.map((task) => (
      <div
        key={task.id}
        className="flex justify-between hover:bg-yellow-100 p-2 rounded-lg"
      >
        <div
         onClick={() => handleCompletTask(task.id, task.task, task.completed)}
         className="flex gap-3  cursor-pointer w-full items-center">
          <input
            type="checkbox"
            className="accent-slate-200 bg-gray-900 cursor-pointer"
            id={task.id}
            checked={task.completed}
            onChange={() =>
              handleCompletTask(task.id, task.task, task.completed)
            }
            onClick={()=>handleCompletTask(task.id, task.task, task.completed) }
          />
          <label
            htmlFor={task.id}
            className={
              task.completed
                ? `line-through text-gray-400 cursor-pointer`
                : `text-gray-900 font-semibold cursor-pointer`
            }
          >
            {task.task}
          </label>
        </div>
        <div className="flex text-slate-400 m-auto p-1">
          {!task.completed && (
            <button
              onClick={() =>
                setTask({
                  id: task.id,
                  task: task.task,
                  completed: task.completed,
                })
              }
              className=" hover:text-slate-600 hover:bg-slate-200 text-sm  rounded-full p-2"
              title="Edit Task"
            >
              <MdModeEdit size={20} />
            </button>
          )}
          <button
            onClick={() => handleDeleteTask(task.id)}
            className=" hover:text-slate-600  hover:bg-red-200 text-sm  rounded-full p-2"
            title="Delete Task"
          >
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </div>
    ));

  return (
    <>
      <div className="relative flex flex-col justify-center gap-5 items-center text-white pt-10 px-5 sm:px-0">
        <h1 className="text-gray-500 text-xl font-bold">To Do App</h1>

        <form
          onSubmit={handleOnSubmit}
          className="flex w-full border max-w-[600px] m-auto rounded-lg p-2 shadow-md bg-white"
        >
          <input
            className="text-gray-900 font-medium p-3 w-full focus:outline-none"
            type="text"
            placeholder="Add New Task.."
            onChange={(e) => setTask({ ...task, task: e.target.value })}
            value={task.task}
          />
          <div className="flex gap-2 p-2">
            {task.id && (
              <div
                onClick={() => setTask({ id: "", task: "", completed: false })}
                className="rounded-full bg-red-400 p-2  hover:bg-red-600 text-xl border-2 cursor-pointer"
                title="Close"
              >
                <MdOutlineClose />
              </div>
            )}
            <button
              className={task.id ? `rounded-full bg-green-500 p-2  hover:bg-green-700 text-xl border-2` : `rounded-full bg-blue-500 p-2  hover:bg-blue-600 text-xl border-2` }
              title="Add"
            >
              {task.id ? <MdSave /> : <MdAdd />}
            </button>
          </div>
        </form>
        <div className=" w-full border max-w-[600px] m-auto rounded-lg p-3 bg-white">
          <div className="text-gray-500 flex flex-col gap-3">
            {tasks.length ? (
              renderTasks()
            ) : (
              <p className="text-center text-sm text-gray-400 font-normal">
                No Task To Do
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
