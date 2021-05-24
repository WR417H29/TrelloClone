import React from "react";
import { textChangeRangeIsUnchanged } from "typescript";
import "./App.css";

import Board from "./components/board";
import { BoardType } from "./components/types";

interface appProps {}

interface appState {
    boards: [];
    currentBoardID: number;
} // declaring the data which must be in the app state

class App extends React.Component<appProps, appState> {
    constructor(props: appProps) {
        super(props);
        this.state = {
            boards: [],
            currentBoardID: -1, // -1 signifies no board has been selected yet
        }; // creating an empty list
    }

    setBoard(toSet: BoardType) {
        // used to set the current board being viewed
        this.setState({ currentBoardID: toSet.id });
    }

    resetBoard() {
        this.setState({ currentBoardID: -1 });
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
        if (this.state.currentBoardID == -1) {
            // if no board is selected then give the user a menu
            let disp: any = [];
            this.state.boards.forEach((board: BoardType) => {
                disp.push(
                    <button onClick={() => this.setBoard(board)}>
                        {board.name}
                    </button>
                );
            });
            return <>{disp}</>;
        } else {
            let disp: any = [];
            this.state.boards.forEach((board: BoardType) => { // this is awful I'm so sorry
                if (board.id == this.state.currentBoardID){
                    disp.push(
                        <div className="board">
                            <Board name={board.name} id={board.id} key={board.id} menuFunction = {() => this.resetBoard()} />
                        </div>
                    ); // creating Board components
                }
            }
        );

            return <div className="home-page">{disp}</div>; // placing them on the screen
        }
    }
}

export default App;
