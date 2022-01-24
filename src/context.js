import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const AirlineContext = createContext();

const initialState = {
    airlineCompanyList: [],
};

export const ContextProvider = ({ children }) => {
    const [value, dispatch] = useReducer(reducer, initialState);
    value.addAirlineCompany = (airline) => {
        dispatch({ type: "ADD_AIRLINE_COMPANY", payload: airline });
    };
    value.removeAirlineCompany = (airline) => {
        dispatch({ type: "REMOVE_AIRLINE_COMPANY", payload: airline });
    };

    return (
        <AirlineContext.Provider value={value}>
            {children}
        </AirlineContext.Provider>
    );
};
