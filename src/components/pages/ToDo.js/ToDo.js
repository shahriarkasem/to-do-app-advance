import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useNotes from "../../hooks/useNotes";
import TaskList from "../TaskList/TaskList";
import { useQuery } from "react-query";

const ToDo = () => {
  const [user] = useAuthState(auth);
  const { notes, refetch } = useNotes(user);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    const description = data.description;
    const email = user.email;
    const complete = false;
    const newTask = { description, email, complete };

    fetch("https://morning-brook-82876.herokuapp.com/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          refetch();
          toast.success("Task added successfully");
          e.target.reset();
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  const handleComplete = (id) => {
    const complete = true;

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
        toast.success("Task completed successfully");
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
      <h3 className="mt-5 text-lg font-bold">Hello, {user?.displayName}</h3>
      <h1 className="text-info text-2xl text-center font-bold mb-5">
        <i>Welcome to To Do app</i>
      </h1>
      <form
        className="flex flex-col justify-center items-center mx-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border-2 p-2 my-1 w-full md:w-1/2 rounded-lg"
          placeholder="Task Description"
          {...register("description")}
          required
        />
        <input
          className="btn btn-info btn-outline border py-1 px-3 text-white mt-2"
          type="submit"
          value="Add task"
        />
      </form>
      <div className="my-5">
        <h1 className="text-center font-bold text-3xl my-3">
          Your task list are below
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
              Please add something to see here
            </p>
          )}
        </div>
      </div>
      <div>
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <label
              onClick={() => setEditTask(null)}
              htmlFor="my-modal-6"
              className="btn btn-sm btn-circle btn-error absolute right-2 top-2"
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
                  htmlFor="my-modal-6"
                  className="btn btn-xs btn-outline btn-success"
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

export default ToDo;
