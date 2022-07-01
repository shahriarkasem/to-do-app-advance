import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useCompletedNotes from "../../hooks/useNotesCompleted";
import TaskList from "../TaskList/TaskList";

const CompletedTasks = () => {
  const [user] = useAuthState(auth);
  const { notes, refetch } = useCompletedNotes(user);

  const handleComplete = (id) => {
    const complete = false;

    fetch(`https://morning-brook-82876.herokuapp.com/update`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ complete, id }),
    }).then((res) => {
      res.json();
      if (res.status === 200) {
        refetch();
        toast.success("Task removed successfully");
      } else {
        refetch();
        toast.error("Something went wrong!");
      }
    });
  };
  const handleDelete = (id) => {
    fetch(`https://morning-brook-82876.herokuapp.com/delete/note/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          refetch();
          toast("Task deleted successfully");
        } else {
          refetch();
          toast.error("Something went wrong!");
        }
      });
  };

  const [editTask, setEditTask] = useState(null);
  const [newDescription, setNewDescription] = useState(editTask?.description);

  useEffect(() => {
    const newTask = editTask?.description;
    setNewDescription(newTask);
  }, [editTask, setNewDescription]);

  const handleEditTask = (event) => {
    const description = event.target.value;
    setNewDescription(description);
  };
  const updateTaskInfo = (e) => {
    const id = editTask?._id;
    const description = newDescription;

    fetch(`https://morning-brook-82876.herokuapp.com/update/note`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ description, id }),
    }).then((res) => {
      res.json();
      if (res.status === 200) {
        refetch();
        toast.success("Task updated successfully");
        setEditTask(null);
      } else {
        refetch();
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <section className="text-center">
      <div className="my-5">
        <h1 className="text-center font-bold text-3xl my-3">
          Your completed task list are below
        </h1>
        <div className="overflow-x-auto">
          {notes?.length >= 1 && (
            <>
              {notes &&
                notes.map((t, index) => (
                  <TaskList
                    key={t._id}
                    index={index}
                    task={t}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                    refetch={refetch}
                    setEditTask={setEditTask}
                  ></TaskList>
                ))}
            </>
          )}
          {notes?.length === 0 && (
            <p className="my-3 text-lg text-red-500 font-semibold text-center">
              Please complete something to see here
            </p>
          )}
        </div>
      </div>
      <div>
        <input type="checkbox" id="my-modal-6" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <label
              onClick={() => setEditTask(null)}
              for="my-modal-6"
              class="btn btn-sm btn-circle btn-error absolute right-2 top-2"
            >
              ✕
            </label>
            <div>
              <div className="form-control w-full max-w-xs">
                <input
                  onChange={handleEditTask}
                  value={newDescription || ""}
                  type="text"
                  name="newDescription"
                  placeholder="New task description"
                  className="input input-bordered input-primary w-full max-w-xs"
                  required
                />
              </div>
              <div
                className="modal-action flex justify-start"
                onClick={updateTaskInfo}
              >
                <label
                  for="my-modal-6"
                  class="btn btn-xs btn-outline btn-success"
                >
                  Update
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompletedTasks;
