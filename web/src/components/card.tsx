import React from "react";

interface cardProps {
    text: string;
    name: string;
    id: number;
} // declaring the required props

interface cardState {
    text: string;
    name: string;
} // declaring the required state

class Card extends React.Component<cardProps, cardState> {
    id: number;
    constructor(props: cardProps) {
        super(props);
        this.id = props.id;
        this.state = {
            text: this.props.text,
            name: this.props.name,
        }; // setting up props and state
    }

    render() {
        return (
            <div className={"card"}>
                {this.state.name}: {this.state.text}
            </div> // creating a component to place on screen
        );
    }
}

export default Card; // exporting the Card class.
