import React from "react";

type Props = {
    name: string;
};

export const Category = (props: Props) => {
    return (
        <div className={props.name + " category"}>
            <p>Test Category</p>
        </div>
    );
};

export default Category;
