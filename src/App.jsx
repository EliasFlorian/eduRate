import './App.css'
import RatingPage from './RatingPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubmittedPage from './SubmittedPage.jsx';
import NoPage from './NoPage.jsx';


function App() {
  return (<div>
    <BrowserRouter>
    <Routes>
      <Route path='/eduRate' element = {<RatingPage />} />
      <Route path='/eduRate/RatingPage' element= {<RatingPage />} />
      <Route path='/eduRate/SubmittedPage' element= {<SubmittedPage />} />
      <Route path='*' element = {<NoPage />} />
    </Routes>
    </BrowserRouter>
  </div>)
}

export default App;
