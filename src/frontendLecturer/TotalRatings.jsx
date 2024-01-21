import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function AverageFeedback({ lecturerID }) {
    const [averages, setAverages] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAverageFeedback = async () => {
            try {
                const response = await fetch(`http://localhost:3000/feedbacktotal?lecturer=${lecturerID}`);
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAverages(data.averages);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            }
        };

        if (lecturerID) {
            fetchAverageFeedback();
        }
    }, [lecturerID]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!averages) {
        return <div>Loading averages...</div>;
    }
    
    return (
        <div style={{ marginTop: '3em' }}> 
        <div>
            <h2>Mein Gesamtrating</h2>
            <Table className='table'>
      <thead className="tablehead">
        <tr>
          <th>Ratingkategorie</th>
          <th>Rating Durchschnitt</th>
        </tr>
      </thead>
      <tbody className="tableview">
            <tr>
              <td>Ich habe viel Neues erfahren.</td>
              <td>{averages.rating1}</td>
            </tr>
            <tr>
              <td>Die Inhalte wurden verständlich vermittelt.</td>
              <td>{averages.rating2}</td>
            </tr>
            <tr>
              <td>Der/die Vortragende wirkt kompetent.</td>
              <td>{averages.rating3}</td>
            </tr>
            <tr>
              <td>Ich weiß jetzt, wie ich mein Wunschstudium finde.</td>
              <td>{averages.rating4}</td>
            </tr>
            <tr>
              <td>Die Präsentationsfolien waren ansprechend gestaltet.</td>
              <td>{averages.rating5}</td>
            </tr>
      </tbody>
    </Table>
        </div>
        </div>
    );
}

export default AverageFeedback;