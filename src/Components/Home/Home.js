import React from 'react';
import BussinessSummary from './BussinessSummary';
import Parts from './Parts';
import './Home.css';
import Reviews from '../Shared/Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Parts />
            <Reviews />
            <BussinessSummary />
        </div>
    );
};

export default Home;