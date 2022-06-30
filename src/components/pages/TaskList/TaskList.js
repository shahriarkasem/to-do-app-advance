import React from 'react';

const TaskList = ({task, index, handleComplete, handleDelete}) => {
    const {_id, name, description, complete} = task;
    return (
        <tr>
        <th>{index + 1}</th>
        <td>{name}</td>
        <td>{description}</td>
        <td className='text-center'>
          {
            !complete ?
            <button onClick={() => handleComplete(_id)} className='btn btn-xs btn-success btn-outline'>Complete</button>
            :
            <p className='btn btn-xs btn-success btn-outline btn-disabled'>Completed</p>
          }
        </td>
        <td className='text-center'><button onClick={() => handleDelete(_id)} className='btn btn-xs btn-outline btn-error'>Delete</button></td>
      </tr>
    );
};

export default TaskList;