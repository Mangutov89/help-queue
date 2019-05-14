import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
  return (
    <div>
      <h1>Help Queue</h1>
      <Link to="/">Home</Link> | <Link to="/newticket">Create Ticket</Link>
      <Link to="/newhighscore">Create highscore</Link>
      <Link to="/highscore">highscore</Link>
    </div>
  );
}

export default Header;
