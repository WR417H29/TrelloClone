import React from "react";

import Category from "./category";
import { CategoryType } from "./types";

// board component, used to display boards
interface boardProps {
    name: string;
    id: number;
    menuFunction: Function;
} // declaring the props that a board must have to be created

interface boardState {
    name: string;
    categories: CategoryType[];
    newCategory: boolean;
    categoryName: string;
} // declaring what each board's state must contain

class Board extends React.Component<boardProps, boardState> {
    id: number;

    constructor(props: boardProps) {
        super(props); // initialising the react.component class

        this.id = props.id; // getting the ID from the props
        this.state = {
            name: this.props.name, // declaring the initial name of the board
            categories: [], // declaring categories as an empty list
            newCategory: false,
            categoryName: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // on page load

        const url = `/categories/${this.id}`;
        /* This URL will make a request to the python API,
           which will return a list of JSON objects, which we will parse through,
           and convert into Category Components.
           the ID is what is used to get the categories for a specific board.
        */

        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ categories: data });
            });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        fetch(`/categories/${this.id}`, {
            method: "POST",
            body: JSON.stringify({
                name: event.target.name.value,
            }),
            headers: {
                "Content-type": "application/json",
            },
        });

        window.setTimeout(() => this.componentDidMount(), 50);
        window.setTimeout(() => this.setState({ newCategory: false }), 50);
    }

    render() {
        let disp: any = []; // creating a list to store categories
        this.state.categories.forEach((category: CategoryType) => {
            disp.push(
                <Category
                    name={category.name}
                    id={category.id}
                    key={category.id}
                    boardID={this.id}
                    deleteFunction={(toRemove: CategoryType) => {
                        this.state.categories.splice(
                            this.state.categories.indexOf(toRemove),
                            1
                        ); // this function is passed to the card and when the card needs to delete itself it passes a CardType object to this which is removed from the list
                        window.setTimeout(() => this.componentDidMount(), 50);
                    }}
                /> // creating a category component using the data from the API
            );
        });

        return (
            <>
                <div className={"toolbar"}>
                    <button onClick={() => this.props.menuFunction()}>
                        back
                    </button>
                    <button
                        onClick={() => {
                            fetch(`/board/delete/${this.id}`); // fetch request to api to delete the psot
                            window.setTimeout(
                                () => document.location.reload(),
                                500
                            ); // reload the page after a 500ms wait
                        }}
                    >
                        Delete Board
                    </button>
                    <button
                        onClick={() => this.setState({ newCategory: true })}
                    >
                        Add new category
                    </button>
                </div>
                <div className={"board"}>
                    {this.props.name}
                    <div className="categories">{disp}</div>
                </div>

                {this.state.newCategory && (
                    <div className={"popUp"}>
                        <button
                            onClick={() =>
                                this.setState({ newCategory: false })
                            }
                        >
                            Back
                        </button>
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <label>
                                Category Name:
                                <input type="text" name="name" />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                )}
            </>
        ); // Returning a styled DIV with the categories in the middle.
    }
}

export default Board;
