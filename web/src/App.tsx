import React from "react";
import "./App.css";

import Board from "./components/board";

function App() {
    // how can we store a list of categories?

    return (
        <div className="home-page">
            <Board name="test" />
            <Board name="test2" />
        </div>
    );
}

export default App;
