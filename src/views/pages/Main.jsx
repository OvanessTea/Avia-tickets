// import { getData } from "../../queries/user-search";
import { useState, useEffect } from "react";
import { FlightsList } from "../components/FlightsList";
import { SortByNavbar } from "../components/SortByNavbar";

function Main(props) {
    const { value } = props;
    const [flights, setFlights] = useState([]);
    const filterResults = (data) => {
        setFlights(data);
    };

    useEffect(() => {
        let data = require("../../flights");
        setFlights(data.result.flights);
    }, []);

    return (
        <main>
            <div className="sidebar">
                <SortByNavbar
                    flights={flights}
                    filterResults={filterResults}
                    value={value}
                />
            </div>
            <div className="content">
                <FlightsList
                    flights={flights}
                    shownFlights={flights.slice(0, 2)}
                />
            </div>
        </main>
    );
}

export { Main };
