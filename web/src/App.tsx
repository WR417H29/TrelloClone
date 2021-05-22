import React from "react";
import "./App.css";

import Category from "./components/category";

function App() {
    return (
        <div className="home-page">
            <div className="categoryContainer">
                <Category name="test" />
                
                <button className = "category">+</button>
            </div>
        </div>
    );
}

export default App;
