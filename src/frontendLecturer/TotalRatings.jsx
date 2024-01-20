import React, { useEffect, useState } from "react";

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
        <div>
            <h2>Mein Gesamtrating</h2>
            <p>Rating 1: {averages.rating1}</p>
            <p>Rating 2: {averages.rating2}</p>
            <p>Rating 3: {averages.rating3}</p>
            <p>Rating 4: {averages.rating4}</p>
            <p>Rating 5: {averages.rating5}</p>
        </div>
    );
}

export default AverageFeedback;