import { FlightLeg } from "./FlightLeg";

function FlightsItem(props) {
    const { flight } = props;

    return (
        <div className="flight-card">
            <div className="flight-price">
                <h2>{flight.price.total.amount} ₽</h2>
                <p>Стоимость для одного взрослого пассажира</p>
            </div>
            <FlightLeg legs={flight.legs[0]} />
            <hr className="legs-delimiter" />
            <FlightLeg legs={flight.legs[1]} />

            <button className="choose-btn">Выбрать</button>
        </div>
    );
}

export { FlightsItem };
