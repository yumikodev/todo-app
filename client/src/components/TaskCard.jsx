import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FiCheck, FiX } from "react-icons/fi";
import { format } from "timeago.js";
import useTasks from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";
import "./TaskCard.css";

function TaskCard({ id, title, description, done, createdAt, updatedAt }) {
  const { deleteTask } = useTasks();
  const navigate = useNavigate();

  const handleDelete = () => deleteTask(id);
  const handleUpdate = () => navigate(`/task/${id}`);

  return (
    <Card className="task_card">
      <Card.Header>Completed: {done ? <FiCheck /> : <FiX />}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>

        <ButtonGroup>
          <Button variant="outline-primary" onClick={handleUpdate}>
            Edit
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Card.Body>
      {createdAt === updatedAt ? (
        <Card.Footer>
          Created: <span>{format(createdAt)}</span>
        </Card.Footer>
      ) : (
        <Card.Footer>
          Updated: <span>{format(updatedAt)}</span>
        </Card.Footer>
      )}
    </Card>
  );
}

export default TaskCard;
