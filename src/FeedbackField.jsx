import './Rating.css';
function FeedbackField({ value, onChange }) {
  return (
   <><div><textarea
   value={value}
   onChange={onChange}
   placeholder="Sag uns, was dir besonders und/oder gar nicht gefallen hat!"
   style={{ minWidth: '100%', minHeight: '6em', marginTop: '2em', fontFamily: 'RedHatDisplay-Bold' }} />
   </div>
          </>
  );
}

  export default FeedbackField;