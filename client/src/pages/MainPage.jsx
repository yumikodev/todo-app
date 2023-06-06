import TaskForm from "../components/TaskForm";
import TasksList from "../components/TasksList";

function MainPage() {
  return (
    <main className="wrapper">
      <TaskForm />
      <TasksList />
    </main>
  );
}

export default MainPage;
