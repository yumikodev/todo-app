import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks";

function TaskForm({ title = "New task" }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    done: false,
  });
  const { getTask, updateTask, newTask } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((task) => {
          setData(task);
        })
        .catch(() => navigate("/"));
    }
  }, [id]);

  /**
   * @param {import("react").ChangeEvent<HTMLInputElement>} e
   */
  const inputHandler = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.value && e.target.value !== "on"
          ? e.target.value
          : e.target.checked,
    });
  };

  /**
   *
   * @param {import("react").FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      updateTask(data)
        .then(() => navigate("/"))
        .then(() =>
          setData({
            title: "",
            description: "",
            done: false,
          })
        )
        .catch((e) => console.error(e));
    } else {
      newTask(data)
        .then(() =>
          setData({
            title: "",
            description: "",
            done: false,
          })
        )
        .catch((e) => console.error(e));
    }
  };

  return (
    <Form className="task_form" onSubmit={handleSubmit}>
      <h1>{title}</h1>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={data.title}
          onChange={inputHandler}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={data.description}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlCheckbox1">
        <Form.Check
          type="checkbox"
          label="Done task."
          name="done"
          onChange={inputHandler}
          checked={data.done}
        />
      </Form.Group>

      {!id ? (
        <Button type="submit">Submit</Button>
      ) : (
        <Button type="submit">Update</Button>
      )}
    </Form>
  );
}

export default TaskForm;
