import React from "react";
import "./App.css";

import Board from "./components/board";
import { BoardType } from "./components/types";

interface appProps {}

interface appState {
    boards: [];
}

class App extends React.Component<appProps, appState> {
    boards: Object[] = [];

    constructor(props: appProps) {
        super(props);
        this.state = {
            boards: [],
        };
    }

    componentDidMount() {
        fetch("/boards", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ boards: data });
            });
    }

    render() {
        let disp: any = [];
        this.state.boards.forEach((board: BoardType) => {
            console.log("Board: " + board.id);
            disp.push(
                <div className="board">
                    <p>{board.name}: </p>
                    <Board name={board.name} id={board.id} key={board.id} />
                </div>
            );
        });

        return <div className="home-page">{disp}</div>;
    }
}

export default App;
