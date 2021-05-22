import React from "react";
import Card from "./card";

type Props = {
    name: string;
};

export const Category = (props: Props) => {
    return (
        <div className={props.name + " category"}>
            test
            <div className={"cardScrollBox"}>
                <Card innerText="Test Card" />
                <Card innerText="Test Card" />
                <button className={"card"}>add new card</button>
            </div>
        </div>
    );
};

export default Category;
