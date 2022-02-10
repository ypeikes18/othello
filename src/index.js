import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Board from './util/board';


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <App />,
    document.getElementById('root')
  );
  window.board = new Board()
})


