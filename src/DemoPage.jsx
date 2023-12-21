import { useState } from 'react'
import './App.css'
import Rating from './Rating.jsx'
import logo from './images/logo.png'
import FeedbackField from './FeedbackField.jsx'
import GetQrCode from './qrCode.jsx'

function DemoPage() {

const [lectureRating, setLectureRating] = useState(0)
  const handleRatingChange = (rating) => {
    setLectureRating(rating);
  };

  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [rating4, setRating4] = useState(0);
  const [rating5, setRating5] = useState(0);


  const handleRatingChange1 = (rating) => {
    setRating1(rating);
  };

  const handleRatingChange2 = (rating) => {
    setRating2(rating);
  };

  const handleRatingChange3 = (rating) => {
    setRating3(rating);
  };

  const handleRatingChange4 = (rating) => {
    setRating4(rating);
  };

  const handleRatingChange5 = (rating) => {
    setRating5(rating);
  };

  return (
    <>
      <div>
        <a href="https://oeh.ac.at/beratung" target="_blank">
          <img src={logo} class="logo" alt="OEHLogo" />
        </a>
      </div>
      <h1>Scanne den QR Code um Feedback zu geben!</h1>
      <div>
        <GetQrCode url='http://localhost:5173/eduRate/RatingPage'></GetQrCode>
      </div>
    </>
  )

}

export default DemoPage;