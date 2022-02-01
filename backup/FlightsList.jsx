import { useState, useEffect } from "react";
import { FlightsItem } from "./FlightsItem";

function FlightsList(props) {
    const { flights, shownFlights } = props;
    const [numberOfResults, setNumberOfResults] = useState(2);
    const [shownResults, setShownResults] = useState([]);
    const showMore = () => {
        setNumberOfResults((currCount) => currCount + 5);
    };
    useEffect(() => {
        setShownResults(flights.slice(0, numberOfResults));
        // eslint-disable-next-line
    }, [numberOfResults]);

    return (
        <div className="flight-list">
            {shownResults.length > 0
                ? shownResults.map((flight) => (
                      <FlightsItem key={flight.flightToken} {...flight} />
                  ))
                : shownFlights.map((flight) => (
                      <FlightsItem key={flight.flightToken} {...flight} />
                  ))}
            <button onClick={() => showMore()} className="btn">
                Показать еще
            </button>
        </div>
    );
}
export { FlightsList };
