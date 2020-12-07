import React from 'react';
import { Wave } from 'react-animated-text';
import './About.css';

export default function About() {
    const text = "Welcome to Teamder. Let us find you some teammates.";
    const time = Date.now();
    return (
        <div className = "AboutPage">
            <Wave text={text} effect="pop" iterations={1} effectChange={1.5} />

        </div>
    )
}