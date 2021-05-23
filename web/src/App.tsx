import React from "react";
import "./App.css";

import Board from "./components/board";

type BoardType = {
    id: number;
    name: string;
};

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
            disp.push(
                <div className="board">
                    <p>Board: </p>
                    <Board name={board.name} key={board.id} />
                </div>
            );
        });

        console.log("Disp: ");
        console.log(disp);

        return <div className="home-page">{disp}</div>;
    }
}

export default App;
