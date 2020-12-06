import React from 'react';
import './Error.css'

export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: { message: '', stack: '' },
        info: { componentStack: '' }
      };
    
      static getDerivedStateFromError = error => {
        return { hasError: true };
      };
    
      componentDidCatch = (error, info) => {
        this.setState({ error, info });
      };
  
    render() {
      if (this.state.hasError) {
        return (
            <h1 className = "Error">
                Something went wrong. If app is in development mode, check console, Else open an issue
                <span>&nbsp;</span>
                <a href = "https://github.com/nihal-ramaswamy/WT-Project/issues/new">
                    here
                </a>
            </h1>
        );
      }
  
      return this.props.children; 
    }
  }