import "./App.css";
import { Main } from "./views/pages/Main";
import { useState } from "react";
import { ContextProvider } from "./context";

function App() {
    const [airlineCompanyList, setAirlineCompanyList] = useState([]);
    const value = { airlineCompanyList, setAirlineCompanyList };
    return (
        <div className="App">
            <ContextProvider value={value}>
                <Main />
            </ContextProvider>
        </div>
    );
}

export default App;
