export function reducer(state, { type, payload }) {
    switch (type) {
        case "ADD_AIRLINE_COMPANY":
            const isCompanyIncludes =
                state.airlineCompanyList.includes(payload);
            if (!isCompanyIncludes) {
                state.airlineCompanyList.push(payload);
            }
            return {
                ...state,
            };
        case "REMOVE_AIRLINE_COMPANY":
            return {
                ...state,
                airlineCompanyList: state.airlineCompanyList.filter(
                    (airline) => airline !== payload
                ),
            };

        default:
            return state;
    }
}
