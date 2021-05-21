import React from "react";

interface cardState {}

interface cardProps {
    innerText?: string;
}

class Card extends React.Component<cardProps, cardState> {
    innerText?: string;

    constructor(props: cardProps) {
        super(props);
        this.innerText = props.innerText ? props.innerText : "Test";
        this.state = {};
    }

    render() {
        return <div className={"card"}>{this.innerText}</div>;
    }
}

export default Card;
