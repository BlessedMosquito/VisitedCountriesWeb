import React from 'react';

function HomePage() {


    return (
        <div className="div-container-style">
            <h1 className = "h1" >Welcome!</h1>
            <p>Get Started and see how much of the World you have discovered!</p>
            <div>
            <img src="/globe.ico" className="rotating-globe"></img>
            </div>
        </div>
    );
}

export default HomePage;