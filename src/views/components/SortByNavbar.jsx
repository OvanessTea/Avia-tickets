import { useState, useEffect, useContext } from "react";
import { AirlineCompany } from "./AirlineCompany";
import { AirlineContext } from "../../context";

function SortByNavbar(props) {
    const { flights, filterResults } = props;
    const { airlineCompanyList } = useContext(AirlineContext);
    const [sortByChoice, setSortByChoice] = useState("incPrice");
    const [oneTransferFlag, setOneTransferFlag] = useState(true);
    const [noTransferFlag, setNoTransferFlag] = useState(true);
    const [minimumPrice, setMinimumPrice] = useState(0);
    const [maximumPrice, setMaximumPrice] = useState(200000);
    const [airlines, setAirlines] = useState([]);
    const [availableAirlineCompanies, setAvailableAirlineCompanies] = useState(
        []
    );

    const filterNumberOfTransfers = (data) => {
        if (oneTransferFlag !== noTransferFlag) {
            if (oneTransferFlag) {
                data = data.filter(
                    (flight) => flight.flight.legs[0].segments.length >= 2
                );
            } else {
                data = data.filter(
                    (flight) => flight.flight.legs[0].segments.length < 2
                );
            }
        }
        return data;
    };
    const sortFunction = (data) => {
        switch (sortByChoice) {
            case "incPrice":
                data = data.sort(function (a, b) {
                    return (
                        a.flight.price.total.amount -
                        b.flight.price.total.amount
                    );
                });
                return data;
            case "decPrice":
                data = data.sort(function (a, b) {
                    return (
                        b.flight.price.total.amount -
                        a.flight.price.total.amount
                    );
                });
                return data;
            case "timeInFlight":
                data = data.sort(function (a, b) {
                    return (
                        a.flight.legs[0].segments[0].travelDuration -
                        b.flight.legs[0].segments[0].travelDuration
                    );
                });
                return data;
            default:
                alert("error");
        }
    };
    const minimalAndMaximumPrice = (data) => {
        data = data.filter(
            (flight) =>
                Number(flight.flight.price.total.amount) >=
                    Number(minimumPrice) &&
                Number(flight.flight.price.total.amount) <= Number(maximumPrice)
        );
        return data;
    };

    const searchByCompany = () => {
        if (airlineCompanyList.length > 0) {
            var data = availableAirlineCompanies.filter((flight) =>
                airlineCompanyList.includes(
                    flight.flight.legs[0].segments[0].airline.caption
                )
            );
        } else {
            data = require("../../flights");
            data = data.result.flights;
        }
        filterResults(data);
    };

    useEffect(() => {
        let data = require("../../flights");
        data = data.result.flights;
        data = sortFunction(data);
        data = filterNumberOfTransfers(data);
        data = minimalAndMaximumPrice(data);
        const airlinesList = [];
        for (let flight of data) {
            if (
                !airlinesList.includes(
                    flight.flight.legs[0].segments[0].airline.caption
                )
            ) {
                airlinesList.push(
                    flight.flight.legs[0].segments[0].airline.caption
                );
            }
        }
        setAirlines(airlinesList);
        setAvailableAirlineCompanies(data);
        filterResults(data);
        // eslint-disable-next-line
    }, [
        sortByChoice,
        oneTransferFlag,
        noTransferFlag,
        minimumPrice,
        maximumPrice,
    ]);

    return (
        <form id="sort-form">
            <p>??????????????????????</p>
            <div className="sort-block">
                <label htmlFor="contactChoice1">
                    <input
                        type="radio"
                        id="contactChoice1"
                        name="contact"
                        value="incPrice"
                        onChange={(e) => setSortByChoice(e.target.value)}
                    />
                    - ???? ?????????????????????? ????????
                </label>

                <label htmlFor="contactChoice2">
                    <input
                        type="radio"
                        id="contactChoice2"
                        name="contact"
                        value="decPrice"
                        onChange={(e) => setSortByChoice(e.target.value)}
                    />
                    - ???? ???????????????? ????????
                </label>

                <label htmlFor="contactChoice3">
                    <input
                        type="radio"
                        id="contactChoice3"
                        name="contact"
                        value="timeInFlight"
                        onChange={(e) => setSortByChoice(e.target.value)}
                    />
                    - ???? ?????????????? ?? ????????
                </label>
            </div>
            <p>??????????????????????</p>
            <div className="sort-block">
                <label htmlFor="oneTransfer">
                    <input
                        type="checkbox"
                        id="oneTransfer"
                        name="transfer"
                        onChange={(e) => setOneTransferFlag(e.target.checked)}
                    />
                    - 1 ??????????????????
                </label>

                <label htmlFor="withoutTransfer">
                    <input
                        type="checkbox"
                        id="withoutTransfer"
                        name="transfer"
                        onChange={(e) => setNoTransferFlag(e.target.checked)}
                    />
                    - ?????? ??????????????????
                </label>
            </div>
            <p>????????</p>
            <div className="sort-block">
                <span>
                    ????{" "}
                    <input
                        type="text"
                        placeholder=""
                        defaultValue={0}
                        onChange={(e) => setMinimumPrice(e.target.value)}
                    />
                </span>
                <span>
                    ????{" "}
                    <input
                        type="text"
                        placeholder=""
                        defaultValue={200000}
                        onChange={(e) => setMaximumPrice(e.target.value)}
                    />
                </span>
            </div>
            <div className="airline-companies">
                <p>????????????????????????</p>
                {airlines.map((airline) => (
                    <AirlineCompany
                        key={airline}
                        airline={airline}
                        flights={flights}
                        filterResults={filterResults}
                        searchByCompany={searchByCompany}
                    />
                ))}
            </div>
        </form>
    );
}

export { SortByNavbar };
