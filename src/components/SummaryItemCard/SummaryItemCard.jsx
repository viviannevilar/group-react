import React from "react";

import "./SummaryItemCard.css";

function SummaryItemCard(props) {
    const { summary_choice, summary_info } = props;

    return (

        <div>
            {summary_choice !== undefined ? (
                <div className="summarybox">
                    <h3>Comparison of Items by {summary_choice}</h3>
                    <ul>
                        {summary_info.map((item, key) => {
                            return (
                                <li key={key}>
                                    <div id="fexrow">
                                        <p>{item.title} : </p>
                                        <p>{item.value}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div >) : (<div></div>)}
        </div>
    );
}

export default SummaryItemCard;


