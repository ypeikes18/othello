import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Board from './game_logic/board';


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <App />,
    document.getElementById('root')
  );
  window.board = new Board()
})


