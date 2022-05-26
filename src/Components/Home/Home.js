import React from 'react';
import BussinessSummary from './BussinessSummary';
import Parts from './Parts';
import './Home.css';
import Reviews from '../Shared/Reviews/Reviews';
import Banner from './Banner';
import About from './About';
import StayInTouch from './StayInTouch';

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <Parts />
            <StayInTouch />
            <Reviews />
            <BussinessSummary />
        </div>
    );
};

export default Home;