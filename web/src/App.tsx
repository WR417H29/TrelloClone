import React from "react";
import "./App.css";

// import Board from "./components/board";

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

    getBoards() {
        fetch("/boards", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                //     this.setState({
                //         boards: data,
                //     });
            });
    }

    componentDidMount() {
        // this.getBoards();
    }

    render() {
        this.getBoards();
        console.log("Data: ");
        console.log(this.boards);

        return <div className="home-page"></div>;
    }
}

export default App;
