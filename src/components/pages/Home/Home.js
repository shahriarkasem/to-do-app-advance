import React from 'react';
import Footer from '../../shared/Footer';
import ToDo from '../ToDo.js/ToDo';

const Home = () => {

    return (
        <section>
           <div className="min-h-screen">
            <ToDo></ToDo>
           </div>
           <Footer></Footer>
        </section>
    );
};

export default Home;