import { useEffect, useState } from "react";
import { data } from "../resolutionsData.js"; // assuming you save the function in api.js

const ResolutionsList = () => {
    const [resolutions, setResolutions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await data();
            setResolutions(result);  // Update state with the fetched data
        };

        fetchData();
    }, []);  // Runs only once when the component is mounted

    return (
        <div>
            {resolutions.map((resolution) => (
                <div key={resolution.id}>
                    <h2>{resolution.title}</h2>
                    <p>{resolution.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ResolutionsList;
