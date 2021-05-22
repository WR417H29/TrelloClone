import React from "react";
import "./App.css";

import Category from "./components/category";

function App() {

    // how can we store a list of categories?

    return (
        <div className="home-page">
            <div className="categoryContainer">
                <Category name="test" />
                <Category name="test" />
                <button className = "category">+</button>
            </div>
        </div>
    );
}

export default App;
