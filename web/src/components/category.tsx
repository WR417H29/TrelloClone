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
                <div className={"cardContainer"}>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
    );
};

export default Category;
