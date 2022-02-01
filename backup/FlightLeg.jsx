function FlightLeg(props) {
    const { legs } = props;
    const departureCity = legs.segments[0].departureCity.caption;
    const departureAirportCapture = legs.segments[0].departureAirport.caption;
    const departureAirportId = legs.segments[0].departureAirport.uid;
    const airlineCaption = legs.segments[0].airline.caption;
    const monthA = "янв,фев,мар,апр,мая,июня,июля,авг,сен,окт,ноя,дек".split(
        ","
    );
    const dayA = "пн,вт,ср,чт,пт,сб,вс".split(",");
    const departureDate = new Date(legs.segments[0].departureDate);
    const departureTime = {
        date: departureDate.getDate(),
        day: dayA[departureDate.getDay()],
        month: monthA[departureDate.getMonth()],
        hours: departureDate.getHours(),
        minutes: departureDate.getMinutes(),
    };
    const travelDuration = legs.segments[0].travelDuration;

    const arrivalDate = new Date(legs.segments[0].arrivalDate);
    const arrivalTime = {
        date: arrivalDate.getDate(),
        day: dayA[arrivalDate.getDay()],
        month: monthA[arrivalDate.getMonth()],
        hours: arrivalDate.getHours(),
        minutes: arrivalDate.getMinutes(),
    };

    if (legs.segments.length > 1) {
        var arrivalCity = legs.segments[1].arrivalCity
            ? legs.segments[1].arrivalCity.caption
            : null;
        var arrivalAirportCaprtion = legs.segments[1].arrivalAirport.caption;
        var arrivalAirportId = legs.segments[1].arrivalAirport.uid;
        var numberOfTransfers = "1 пересадка";
    } else {
        arrivalCity = legs.segments[0].arrivalCity.caption;
        arrivalAirportCaprtion = legs.segments[0].arrivalAirport.caption;
        arrivalAirportId = legs.segments[0].arrivalAirport.uid;
        numberOfTransfers = null;
    }
    return (
        <>
            <div className="flight-way">
                <label className="airport-label">
                    <p>{departureCity},</p>
                    <p>{departureAirportCapture}</p>

                    <span className="blue-span">({departureAirportId})</span>
                </label>
                <span className="blue-span">&#8594;</span>
                <label className="airport-label">
                    <p>{arrivalCity ? arrivalCity : null},</p>
                    <p>{arrivalAirportCaprtion}</p>

                    <span className="blue-span">({arrivalAirportId})</span>
                </label>
            </div>
            <hr id="blind-hr" />
            <div className="dates">
                <div className="time-departure">
                    <p>
                        {departureTime.hours}:{departureTime.minutes}{" "}
                    </p>
                    <span className="blue-span">
                        {departureTime.date} {departureTime.month}.{" "}
                        {departureTime.day}
                    </span>
                </div>
                <div className="flight-duration">
                    &#128339;{Math.floor(travelDuration / 60)} ч{" "}
                    {travelDuration % 60} мин
                </div>
                <div className="time-arrive">
                    <span className="blue-span">
                        {arrivalTime.date} {arrivalTime.month}.{" "}
                        {arrivalTime.day}
                    </span>
                    <p>
                        {arrivalTime.hours}:{arrivalTime.minutes}{" "}
                    </p>
                </div>
            </div>
            <div className="number-of-transfers">
                <hr />
                <p>{numberOfTransfers ? numberOfTransfers : null}</p>
            </div>
            <p className="airline">Рейс выполняет: {airlineCaption}</p>
        </>
    );
}

export { FlightLeg };
