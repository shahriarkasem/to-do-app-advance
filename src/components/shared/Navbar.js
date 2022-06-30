import { signOut } from "firebase/auth";
import React from "react";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    signOut(auth);
  };
  const menu = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/calendar'>Calendar</Link>
      </li>
      <li>
        <Link to='/competedTasks'>Completed Tasks</Link>
      </li>
    </>
  );

  return (
    <section>
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu}
            </ul>
          </div>
          <a class="btn btn-ghost normal-case text-xl">To Do App</a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal p-0">{menu}</ul>
        </div>
        <div class="navbar-end cursor-pointer mr-1 md:mr-5">
            <a onClick={logout} className='font-semibold'>Sign Out</a>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
