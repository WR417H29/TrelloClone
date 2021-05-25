import React from "react";

interface cardProps {
    text: string;
    name: string;
    id: number;
    categoryID: number;
    deleteFunction: Function;
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
                <div className={"cardInternals"}>
                    <>
                        {this.state.name}: {this.state.text}
                    </>
                    {/* the <> have to be there otherwise it thinks theres nothing inside the div and react ignores it*/}
                </div>
                <button
                    className={"cardDeleteButton"}
                    onClick={() => {
                        fetch(`/card/delete/${this.id}`);
                        this.props.deleteFunction({
                            id: this.props.id,
                            name: this.props.name,
                            body: this.props.text,
                            categoryID: this.props.categoryID,
                        }); // create a card type object representing ourselves, then pass that to the category which will find something identical to it in its card list and delete it
                    }}
                >
                    x
                </button>
            </div> // creating a component to place on screen
        );
    }
}

export default Card; // exporting the Card class.
