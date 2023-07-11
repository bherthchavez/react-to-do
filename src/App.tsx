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

  const handleAddTask = () => {
    dispatch(addTask({ task: task.task, completed: false }));
    setTask({ id: "", task: "", completed: false });
    setTimeout(reFetched, 50);
  };

  const handleCompletTask = (
    id: string,
    task: string,
    completed: boolean
  ): void => {
    dispatch(updateCompleted({ id, task, completed: !completed }));
    setTimeout(reFetched, 50);
  };

  const handleEditTask = (): void => {
    console.log(task);
    dispatch(
      updateTask({ id: task.id, task: task.task, completed: task.completed })
    );
    setTask({ id: "", task: "", completed: false });
    setTimeout(reFetched, 50);
  };

  const handleDeleteTask = (id: string): void => {
    dispatch(deleteTask({ id }));
    setTimeout(reFetched, 50);
  };

  const renderTasks = () =>
    tasks.map((task) => (
      <div key={task.id} className="flex justify-between">
        <div className="flex gap-3 pr-5">
          <input
            type="checkbox"
            className="accent-slate-200 bg-gray-900"
            id={task.id}
            checked={task.completed}
            onChange={() =>
              handleCompletTask(task.id, task.task, task.completed)
            }
          />
          <label
            htmlFor={task.id}
            className={task.completed ? `line-through text-gray-400` : "text-gray-900 font-semibold"}
          >
            {task.task}
          </label>
        </div>
        <div className="flex gap-4 text-slate-400">
          {!task.completed && (
            <button
              onClick={() =>
                setTask({
                  id: task.id,
                  task: task.task,
                  completed: task.completed,
                })
              }
              className=" hover:text-slate-600 text-sm  rounded"
              title="Edit Task"
            >
              <MdModeEdit size={20} />
            </button>
          )}
          <button
            onClick={() => handleDeleteTask(task.id)}
            className=" hover:text-slate-600  text-sm rounded"
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
        <div className="flex w-full border max-w-[600px] m-auto rounded-lg p-2 shadow-md bg-white">
          <input
            className="text-gray-900 font-medium p-3 w-full focus:outline-none"
            type="text"
            placeholder="Add New Task.."
            onChange={(e) => setTask({ ...task, task: e.target.value })}
            value={task.task}
          />
          <div className="flex gap-2 p-2">
            {task.id && (
              <button
                onClick={() => setTask({ id: "", task: "", completed: false })}
                className="rounded-full bg-red-500 p-2  hover:bg-red-600 text-xl border-2"
                title="Close"
              >
                <MdOutlineClose />
              </button>
            )}
            <button
              onClick={() => (task.id ? handleEditTask() : handleAddTask())}
              className="rounded-full bg-gray-500 p-2  hover:bg-gray-600 text-xl border-2"
              title="Add"
            >
              {task.id ? <MdSave /> : <MdAdd />}
            </button>
          </div>
        </div>
        <div className=" w-full border max-w-[600px] m-auto rounded p-6 bg-white">
          <div className="text-gray-500 flex flex-col gap-6">
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
