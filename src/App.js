import './App.css';

import React, { useState } from 'react'
import Navbar from './MyComponents/Navbar';
import News from './MyComponents/News';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;
  const pageSize = 9;
  const [progress, setProgress] = useState(0);

    return (
      <div>
        <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
        />
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" apikey={apikey}/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" apikey={apikey}/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" apikey={apikey}/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" apikey={apikey}/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" apikey={apikey}/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} key="science"pageSize={pageSize} country="in" category="science" apikey={apikey}/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" apikey={apikey}/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" apikey={apikey}/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;
