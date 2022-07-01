import React from "react";


const TaskList = ({ task, handleComplete, handleDelete, refetch, setEditTask }) => {
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
              className="checkbox checkbox-accent"
            />
          ) : (
            <input
              type="radio"
              onClick={() => handleComplete(_id)}
              name="radio-4"
              className="radio radio-accent"
            />
          )}
          <div className="">
            <p className="m-4 break-all">{description}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="my-modal-6"
            onClick={() => setEditTask(task)}
            className="btn btn-xs btn-outline btn-info my-2"
          >
            Edit
          </label>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-xs btn-outline btn-error mb-2"
          >
            Delete
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default TaskList;
