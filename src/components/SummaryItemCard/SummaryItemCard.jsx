import React from "react";

import "./SummaryItemCard.css";

function SummaryItemCard(props) {
    const { summary_choice, summary_info } = props;

    return (

        <div id="summarybox">
            {summary_choice !== undefined ? (<div id="summarybox">
                <h3>Comparison summary by {summary_choice}</h3>
                {summary_info.map((item, key) => {
                    return (
                        <div id="fexrow">
                            <p>{item.title} - </p>
                            <p>{summary_choice}: {item.value}</p>
                        </div>)

                })
                }

            </div>) : (<div></div>

                )}

        </div>
    );
}

export default SummaryItemCard;
