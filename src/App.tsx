import React, { useState, useEffect } from 'react';
import './App.css';

import Sidebar from './component/sidebar/Sidebar'
import Inputbar from './component/input/Inputbar'


function App() {

  return (
    <main >
      <Sidebar/>
      <Inputbar/>
    </main>
  );
}

export default App;
