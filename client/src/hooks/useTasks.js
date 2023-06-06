import useAxios from "./useAxios.js";
import useSocket from "./useSocket.js";

function useTasks() {
  const axios = useAxios();
  const io = useSocket();

  function getTasks() {
    return new Promise((resolve, reject) =>
      axios
        .get("/tasks")
        .then((res) => res.data.tasks)
        .then((tasks) => {
          resolve(tasks);
        })
        .catch((e) => reject(e))
    );
  }

  function getTask(id) {
    return new Promise((resolve, reject) =>
      axios
        .get(`/task/${id}`)
        .then((res) => res.data)
        .then((tasks) => {
          resolve(tasks);
        })
        .catch((e) => reject(e))
    );
  }

  function newTask(data) {
    return new Promise((resolve, reject) =>
      axios
        .post("/new_task", data)
        .then((res) => res.data)
        .then((task) => {
          io.emit("client:new_task", task);
          resolve(task);
        })
        .catch((e) => reject(e))
    );
  }

  function updateTask(data) {
    return new Promise((resolve, reject) =>
      axios
        .put(`/task/${data._id}`, data)
        .then((res) => res.data)
        .then((task) => {
          io.emit("client:update_task", task);
          resolve(task);
        })
        .catch((e) => reject(e))
    );
  }

  function deleteTask(id) {
    return new Promise((resolve, reject) =>
      axios
        .delete(`/task/${id}`)
        .then((res) => res.data)
        .then((task) => {
          io.emit("client:delete_task", task);
          resolve(task);
        })
        .catch((e) => reject(e))
    );
  }

  return { getTasks, getTask, newTask, updateTask, deleteTask };
}

export default useTasks;
