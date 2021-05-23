import React from "react";

interface cardProps {
    text: string;
    key: number;
}

interface cardState {
    text: string;
}

class Card extends React.Component<cardProps, cardState> {
    key: number;
    constructor(props: cardProps) {
        super(props);
        this.key = props.key;
        this.state = {
            text: this.props.text,
        };
    }

    render() {
        return <div className={"card"}>{this.state.text}</div>;
    }
}

export default Card;
