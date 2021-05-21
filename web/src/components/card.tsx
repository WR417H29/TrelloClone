import React from "react";

interface cardState {
    containedText: string;
}

interface cardProps {

}

class Card extends React.Component<cardProps, cardState>
{
    constructor(props: any)
    {
        super(props)
    }

    public render(){
        return(
            <div className = {"card"}>
                test Card
            </div>
        );
    }

    
}

export default Card;
