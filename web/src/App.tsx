import React from "react";
import "./App.css";

import Board from "./components/board";
import { BoardType } from "./components/types";

interface appProps {}

interface appState {
    boards: [];
} // declaring the data which must be in the app state

class App extends React.Component<appProps, appState> {
    constructor(props: appProps) {
        super(props);
        this.state = {
            boards: [],
        }; // creating an empty list
    }

    componentDidMount() {
        const url = "/boards"; // posting a get request to the python API

        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ boards: data });
            }); // adding all boards to the state
    }

    render() {
        let disp: any = [];
        this.state.boards.forEach((board: BoardType) => {
            disp.push(
                <div className="board">
                    <p>{board.name}: </p>
                    <Board name={board.name} id={board.id} key={board.id} />
                </div>
            ); // creating Board components
        });

        return <div className="home-page">{disp}</div>; // placing them on the screen
    }
}

export default App;
