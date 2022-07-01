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
     
    </section>
  );
};

export default CompletedTasks;
