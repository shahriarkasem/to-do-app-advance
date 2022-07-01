import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const TaskList = ({ task, handleComplete, handleDelete, refetch }) => {
  const { _id, description, complete } = task;
  const [editTask, setEditTask] = useState();
  const {data: note, isLoading} = useQuery('noteData', () => fetch(`http://localhost:5000/note?id=${editTask}`).then(res=>res.json()
  )
  )
  console.log(note)
  const [newDescription, setNewDescription] = useState();
  // console.log(editTask?._id);
  // console.log(newDescription);

  const handleEditTask = (event) => {
    const description = event.target.value;
    setNewDescription(description);
  };
  const updateTaskInfo = (e) => {
    const id = editTask?._id;
    const description = newDescription;

    fetch(`http://localhost:5000/update/note`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ description, id }),
    }).then((res) => {
      res.json();
      if (res.status === 200) {
        refetch();
        toast.success("Task removed successfully");
        setEditTask(null);
      } else {
        refetch();
        toast.error("Something went wrong!");
      }
    });
  };
  return (
    <div className="mx-4 md:mx-10">
      <div className="flex justify-between items-center border-2 px-2 rounded-lg my-1">
        <div className="flex justify-start items-center">
          {complete === true ? (
            <input
              type="checkbox"
              onClick={() => handleComplete(_id)}
              checked="checked"
              class="checkbox checkbox-accent"
            />
          ) : (
            <input
              type="radio"
              onClick={() => handleComplete(_id)}
              name="radio-4"
              class="radio radio-accent"
            />
          )}
          <div className="">
            <p className="m-4 break-all">{description}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            for="my-modal-6"
            onClick={() => setEditTask(_id)}
            class="btn btn-xs btn-outline btn-info my-2"
          >
            Edit
          </label>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-xs btn-outline btn-error"
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <input type="checkbox" id="my-modal-6" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <label
              for="my-modal-6"
              class="btn btn-sm btn-circle btn-error absolute right-2 top-2"
            >
              ✕
            </label>
            <form onSubmit={updateTaskInfo}>
              <div
                onChange={handleEditTask}
                className="form-control w-full max-w-xs"
              >
                <input
                  // value={newDescription || ""}
                  type="text"
                  name="newDescription"
                  placeholder="New task description"
                  className="input input-bordered input-primary w-full max-w-xs"
                  required
                />
              </div>
              <div className="modal-action">
                <input
                  for="my-modal-6"
                  class="btn btn-xs btn-outline btn-success"
                  type="submit"
                  value="update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
