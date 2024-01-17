import { useState } from 'react'
import './App.css'
import Rating from './Rating.jsx'
import logo from './images/logo.png'
import FeedbackField from './FeedbackField.jsx'
import { useParams } from 'react-router-dom';


function RatingPage() {

  const { lectureID } = useParams();
  
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

  function handleSubmission() {
    console.log("Thanks fo the Submission!");

    window.location.href = '/eduRate/SubmittedPage';
  }


  /*const handleSubmission = async () => {
    const ratingsData = {
      rating1,
      rating2,
      rating3,
      rating4,
      rating5
    };
  
    try {
      const response = await fetch('BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingsData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      alert('Ratings submitted successfully!');
    } catch (error) {
      console.error('Failed to submit ratings:', error);
    }
  };*/

  return (
    <>
      <div>
        <a href="https://oeh.ac.at/beratung" target="_blank">
          <img src={logo} class="logo" alt="OEHLogo" />
        </a>
      </div>
      <p className='heading'>Willkommen bei eduRate!</p>
      <div className='cards'>
      <p className = 'ratingAsset'>Ich habe viel Neues erfahren.</p>
      <Rating rating={rating1} onRatingChange={handleRatingChange1} />
      <p className = 'ratingAsset'>Die Inhalte wurden verständlich vermittelt.</p>
      <Rating rating={rating2} onRatingChange={handleRatingChange2} />
      <p className = 'ratingAsset'>Der/die Vortragende wirkt kompetent.</p>
      <Rating rating={rating3} onRatingChange={handleRatingChange3} />
      <p className = 'ratingAsset'>Ich weiß jetzt, wie ich mein Wunschstudium finde.</p>
      <Rating rating={rating4} onRatingChange={handleRatingChange4} />
      <p className = 'ratingAsset'>Die Präsentationsfolien waren ansprechend gestaltet.</p>
      <Rating rating={rating5} onRatingChange={handleRatingChange5} />
      <div>
<FeedbackField></FeedbackField>        
     </div>
      <div style={{marginTop: '2em'}}><button id='submitButton'onClick={handleSubmission}>Feedback senden</button>
            </div>
      
      </div>
    </>
  )

}

export default RatingPage;