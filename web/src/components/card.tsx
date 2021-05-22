import React from "react";

interface cardProps {
    text: string;
}

interface cardState {
    text: string;
}

class Card extends React.Component<cardProps, cardState> {
    constructor(props: cardProps) {
        super(props);
        this.state = {
            text: this.props.text,
        };
    }

    render() {
        return <div className={"card"}>{this.state.text}</div>;
    }
}

export default Card;
