import React from "react";
import Card from "./card";
import { Plus } from "styled-icons";

type Props = {
    name: string;
};

export const Category = (props: Props) => {
    return (
        <div className={props.name + " category"}>
            test
            <div className={"cardScrollBox"}>
                <div className={"cardContainer"}>
                    <Card innerText="Test Card" />
                </div>
                <button>{Plus}</button>
            </div>
        </div>
    );
};

export default Category;
