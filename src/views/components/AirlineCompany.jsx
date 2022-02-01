import { useContext } from "react";
import { useState, useEffect } from "react";
import { AirlineContext } from "../../context";

function AirlineCompany(props) {
    const { airline, flights, searchByCompany = Function.prototype } = props;
    const [minimumPrice, setMinimumPrice] = useState(200000);
    const { addAirlineCompany, removeAirlineCompany } =
        useContext(AirlineContext);

    const toggleAirlineCompanyChecke = (e) => {
        e.target.checked
            ? addAirlineCompany(airline)
            : removeAirlineCompany(airline);
        searchByCompany();
    };

    useEffect(() => {
        let flightsFilterByCompany = flights.filter(
            (flight) =>
                flight.flight.legs[0].segments[0].airline.caption === airline
        );
        let minPrice;
        if (flightsFilterByCompany.length === 1) {
            minPrice = flightsFilterByCompany[0].flight.price.total.amount;
        } else {
            for (let i = 0; i < flightsFilterByCompany.length - 1; i++) {
                if (
                    flightsFilterByCompany[i].flight.price.total.amount <
                    flightsFilterByCompany[i + 1]
                ) {
                    minPrice =
                        flightsFilterByCompany[i].flight.price.total.amount;
                }
            }
        }
        setMinimumPrice(minPrice);
        // eslint-disable-next-line
    }, []);
    return (
        <label htmlFor={airline} className="airlinesOffers">
            <input
                type="checkbox"
                className="airlines"
                name="transfer"
                required
                onChange={(e) => toggleAirlineCompanyChecke(e)}
            />
            <span>
                <p>
                    {" "}
                    -{" "}
                    {airline.length > 20
                        ? airline.slice(0, 15) + "..."
                        : airline}
                </p>
                <p id="best-price"> от {minimumPrice} р.</p>
            </span>
        </label>
    );
}
export { AirlineCompany };
