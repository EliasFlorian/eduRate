import './Rating.css';

function FeedbackField({ value, onChange }) {
    return (
     <><div><textarea
            value={value}
            onChange={onChange}
            placeholder="Sag uns, was dir besonders und/oder gar nicht gefallen hat!"
            style={{ minWidth: '100%', minHeight: '6em', marginTop: '2em', fontFamily: 'RedHatDisplay-Bold' }} />
            </div>
            <div style={{marginTop: '2em'}}><button id='submitButton'onClick={handleSubmission}>Feedback senden</button>
            </div></>
    );
  }
  
  function handleSubmission() {
    console.log("Thanks fo the Submission!");
    window.location.href = '/eduRate/SubmittedPage';
  }


  export default FeedbackField;