import React from "react";
import "./App.css";

import Board from "./components/board";
import { BoardType } from "./components/types";

interface appProps {}

interface appState {
    boards: [];
    currentBoardID: number;
    newBoard: boolean;
} // declaring the data which must be in the app state

class App extends React.Component<appProps, appState> {
    constructor(props: appProps) {
        super(props);
        this.state = {
            boards: [],
            currentBoardID: -1, // -1 signifies no board has been selected yet
            newBoard: false, // false means new board is not being created.
        }; // creating an empty list
    }

    setBoard(toSet: BoardType) {
        // used to set the current board being viewed
        this.setState({ currentBoardID: toSet.id });
    }

    resetBoard() {
        this.setState({ currentBoardID: -1 });
    }

    newBoard() {
        this.setState({ newBoard: true });
    }

    handleSubmit(event: any) {
        console.log(event);
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
        if (!this.state.newBoard) {
            if (this.state.currentBoardID === -1) {
                // if no board is selected then give the user a menu
                let disp: any = [];
                this.state.boards.forEach((board: BoardType) => {
                    disp.push(
                        <button
                            className="board-select"
                            onClick={() => this.setBoard(board)}
                        >
                            {board.name}
                        </button>
                    );
                });

                return (
                    <div className={"menuContainer"}>
                        <div className={"menuBody"}>
                            {disp}
                            <button
                                className="board-select"
                                onClick={() => this.newBoard()}
                            >
                                New Board
                            </button>
                        </div>
                        <div className={"introBox"}>
                            hey welcome to our trello clone, to start, pick a
                            board
                        </div>
                    </div>
                );
            } else {
                let disp: any = [];
                this.state.boards.forEach((board: BoardType) => {
                    // this is awful I'm so sorry
                    if (board.id === this.state.currentBoardID) {
                        disp.push(
                            <Board
                                name={board.name}
                                id={board.id}
                                key={board.id}
                                menuFunction={() => this.resetBoard()}
                            />
                        ); // creating Board components
                    }
                });

                return <div className="home-page">{disp}</div>; // placing them on the screen
            }
        } else {
            return (
                <div className="menu-container">
                    <div className="menuBody">
                        <div className="toolbar">
                            <button onClick={() => this.resetBoard()}>
                                back
                            </button>
                        </div>
                        <form method="POST" action="/boards">
                            <label>
                                Board Name:
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="false"
                                />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div className={"introBox"}>
                        hey welcome to our trello clone, to start, pick a board
                    </div>
                </div>
            );
        }
    }
}

export default App;
