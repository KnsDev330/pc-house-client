import React from 'react';
import BussinessSummary from './BussinessSummary';
import Parts from './Parts';
import './Home.css';
import Reviews from '../Shared/Reviews/Reviews';
import Banner from './Banner';
import About from './About';

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <Parts />
            <Reviews />
            <BussinessSummary />
        </div>
    );
};

export default Home;