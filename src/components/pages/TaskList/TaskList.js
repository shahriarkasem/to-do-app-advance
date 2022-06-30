import React, { useState } from "react";

const TaskList = ({ task, handleComplete, handleDelete }) => {
  const [editTask, setEditTask] = useState("");
  const { _id, description, complete } = task;
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
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-xs btn-outline btn-error"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskList;
