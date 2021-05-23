import React from "react";

interface cardProps {
    text: string;
    name: string;
    id: number;
}

interface cardState {
    text: string;
    name: string;
}

class Card extends React.Component<cardProps, cardState> {
    id: number;
    constructor(props: cardProps) {
        super(props);
        this.id = props.id;
        this.state = {
            text: this.props.text,
            name: this.props.name,
        };
    }

    render() {
        return (
            <div className={"card"}>
                {this.state.name}: {this.state.text}
            </div>
        );
    }
}

export default Card;
