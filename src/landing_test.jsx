//landing test page , this page opens up after clicking on signup from signup page or login from login page
/*
import React from 'react';
import './landing_test.css';

function LandingTest() {
    return(<>
    <div className="central">
        <p className="central-text">
        Welcome to the PersonaPath's Test</p>
         </div>
        <div className="subcentral">Click To Go To Test</div>
   
    </>
    
);
}

export default LandingTest;*/
//landing test page , this page opens up after clicking on signup from signup page or login from login page
import React from 'react';
import './landing_test.css';

function LandingTest() {
    const handleStartTest = () => {
        // Navigate to test page
        console.log('Starting test...');
        // Add navigation logic here, e.g., window.location.href = '/test';
    };

    const handleViewResults = () => {
        // Navigate to results page
        console.log('Viewing past results...');
        // Add navigation logic here, e.g., window.location.href = '/results';
    };

    // You can replace 'User' with actual username from props or state
    const username = 'User'; // Replace with actual user data

    return (
        <>
            <div className="central">
                <p className="central-text">
                    Welcome to the PersonaPath
                </p>
            </div>
            
            <div className="subcentral">
                <button className="test-button" onClick={handleStartTest}>
                    Click To Go To Test
                </button>
                
                <button className="results-button" onClick={handleViewResults}>
                    View Past Results
                </button>
            </div>
        </>
    );
}

export default LandingTest;