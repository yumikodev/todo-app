import { useEffect, useState } from "react";
import TaskCard from "./TaskCard.jsx";
import useTasks from "../hooks/useTasks.js";
import useSocket from "../hooks/useSocket.js";
import Alert from "react-bootstrap/Alert";
import "./TaskList.css";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const { getTasks } = useTasks();
  const io = useSocket();

  // Escucha cuando se cree una tarea
  io.on("server:new_task", (task) => setTasks([...tasks, task]));

  // Escucha cuando se actualice una tarea
  io.on("server:update_task", (task) => {
    const updatedTasks = tasks.map((data) => {
      if (data._id === task._id) {
        return task;
      } else {
        return data;
      }
    });

    setTasks(updatedTasks);
  });

  // Escucha cuando se elimine una tarea
  io.on("server:delete_task", (task) => {
    const updatedtasks = tasks.filter((data) => data._id !== task._id);

    setTasks(updatedtasks);
  });

  useEffect(() => {
    getTasks()
      .then((tasks) => setTasks(tasks))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="tasks_list">
      <h2>Tasks:</h2>

      <div className="container">
        {tasks.length === 0 ? (
          <Alert variant="danger">No hay tareas :(</Alert>
        ) : (
          tasks.map(
            ({ _id, title, description, done, createdAt, updatedAt }, i) => (
              <TaskCard
                key={i}
                id={_id}
                title={title}
                description={description}
                done={done}
                createdAt={createdAt}
                updatedAt={updatedAt}
              />
            )
          )
        )}
      </div>
    </div>
  );
}

export default TasksList;
