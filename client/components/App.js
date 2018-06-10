import React from 'react';
import { Link } from 'react-router';

export default ({ children }) => {
  return <div>
    <nav>
      <Link to='/' className="material-icons" >
        home
      </Link>
    </nav>
    <div className="container">
      {children}
    </div>

  </div>
}