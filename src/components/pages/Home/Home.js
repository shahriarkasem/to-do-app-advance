import { signOut } from 'firebase/auth';
import React from 'react';
import auth from '../../../firebase.init';

const Home = () => {
    const logout = () => {
        signOut(auth)
    }
    return (
        <section>
            <button onClick={logout} className='mx-10 my-10 btn btn-outline'>Sign Out</button>
        </section>
    );
};

export default Home;