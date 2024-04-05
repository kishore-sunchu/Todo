import { useEffect, useRef, useState } from "react";
import { date } from "./utils/DateFuncs";

function App() {
  const [inputTask, setInputTask] = useState("");
  const unOrderedList = useRef(null);
  const [Task, setTask] = useState(
    JSON.parse(localStorage.getItem("task")) !== null
      ? JSON.parse(localStorage.getItem("task"))
      : {}
  );
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    let taskArray = [];
    for (const key in Task) {
      if (Object.hasOwnProperty.call(Task, key)) {
        const element = Task[key];
        taskArray.push(element);
      }
    }
    setAllTask(taskArray);
  }, [Task]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputTask !== "") {
      let currentDate = Date.now().toString();
      setInputTask((Task[currentDate] = inputTask));
      localStorage.setItem("task", JSON.stringify(Task));
      setInputTask("");
      let tasks = JSON.parse(localStorage.getItem("task"));
      setTask(tasks);
    }
  };

  function getKeyByValue(object, value) {
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop] === value) return prop;
      }
    }
  }

  const handleAdd = () => {
    if (inputTask === "") alert("Please add any Task");
    else {
      let currentDate = Date.now().toString();
      let newTask = { [currentDate]: inputTask };
      localStorage.setItem("task", JSON.stringify(newTask));
      setInputTask("");
      let tasks = JSON.parse(localStorage.getItem("task"));
      setTask(tasks);
    }
  };

  const handleDelete = (task) => {
    if (Object.values(Task).includes(task)) {
      let key = getKeyByValue(Task, task);
      delete Task[key];
      localStorage.setItem("task", JSON.stringify(Task));
      let tasks = JSON.parse(localStorage.getItem("task"));
      setTask(tasks);
    }
  };
  return (
    <>
      <section className="">
        <header className="flex justify-between items-center p-5">
          <h1 className="text-2xl">Hello User</h1>
          <h1 className="text-xl">{date()}</h1>
        </header>
        <div className="text-center py-2 text-4xl capitalize">Todo List</div>
        <div className="flex justify-center items-center mt-4 w-full">
          <input
            type="text"
            name="task"
            id="task"
            value={inputTask}
            onChange={(e) => {
              setInputTask(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Add Your Task here..."
            className="bg-slate-200 outline-none border-none px-3 py-2 text-lg w-1/2 rounded-l-lg"
          />
          <button
            className="bg-slate-300 px-5 py-2 text-lg rounded-r-lg outline-none"
            onClick={handleAdd}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
        </div>
      </section>
      <section className="mt-5">
        <h1 className="w-1/2 m-auto text-lg font-normal">Pending Task:</h1>
        <ul
          ref={unOrderedList}
          className="py-5 flex flex-col justify-center items-center gap-5 w-1/2 m-auto">
          {allTask?.map((task) => {
            return (
              <li className="flex justify-between items-center w-full p-3 rounded-lg border capitalize bg-slate-500">
                <div className="w-[90%]">{task}</div>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-check"
                    viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(task)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default App;
