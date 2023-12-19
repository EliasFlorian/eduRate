import { useState } from 'react'
import './App.css'
import Rating from './Rating.jsx'
import logo from './images/logo.png'
import FeedbackField from './FeedbackField.jsx'

function RatingPage() {

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
      <h1>Willkommen bei eduRate!</h1>
      <div class="card">
      <p class = 'ratingAsset'>Ich habe viel Neues erfahren.</p>
      <Rating rating={rating1} onRatingChange={handleRatingChange1} />
      <p class = 'ratingAsset'>Die Inhalte wurden verständlich vermittelt.</p>
      <Rating rating={rating2} onRatingChange={handleRatingChange2} />
      <p class = 'ratingAsset'>Der/die Vortragende wirkt kompetent.</p>
      <Rating rating={rating3} onRatingChange={handleRatingChange3} />
      <p class = 'ratingAsset'>Ich weiß jetzt, wie ich mein Wunschstudium finde.</p>
      <Rating rating={rating4} onRatingChange={handleRatingChange4} />
      <p class = 'ratingAsset'>Die Präsentationsfolien waren ansprechend gestaltet.</p>
      <Rating rating={rating5} onRatingChange={handleRatingChange5} />
      <div>
        <FeedbackField> </FeedbackField>
      </div>
      </div>
    </>
  )

}

export default RatingPage;