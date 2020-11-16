import React from "react";
import "./SummaryItemCard.css";
import nophoto from '../../images/noimage.PNG';





function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

function calculateDiscount(price, discount) {
    var total_saving = parseInt(price) * (discount / 100)
    return Math.round(total_saving, 3)
}
function calculateNewPrice(oldprice, totalsaving) {
    var updateprice = parseInt(oldprice) - parseInt(totalsaving)
    return updateprice
}






function SummaryItemCard(props) {
    const { summary_choice, summary_info } = props;

    return (

        <div>
            {summary_choice !== undefined ? (
                <div className="summarybox">
                    <h4 id="summartytitle" >Comparison of Items by {summary_choice}</h4>
                    {summary_info.map((value, index) => {
                        return (
                            <div id="summaryitemcontainer">
                                <div className={`summary-item ${value.is_active ? "" : "archived-item"}`}>
                                    {value.image !== null ? <img className="item-small" alt="Item" src={value.image} /> : <img className="item-small" alt="Item" src={nophoto} />}
                                    <span id="summaryattributeselect" >{value.title}:</span>
                                </div>

                                {summary_choice === "Price" ? (
                                    <div id="summaryitemvalue">    {
                                        value.value != null ?
                                            (<div>
                                                { parseInt(value.sale_amount) !== 0 ? (
                                                    <p> ${calculateNewPrice(value.value, calculateDiscount(value.value, value.sale_amount))}   (<strike>${value.value}</strike>) </p>)
                                                    : <p> ${value.value} </p>}
                                            </div>)
                                            : (<div><p id="emptyattributelsit">No price provided</p></div>)
                                    }
                                    </div>) : ("")}
                                {summary_choice === "Discount" ? (<div id="summaryitemvalue">{value.value}% off</div>) : ("")}
                                {summary_choice !== "Discount" && summary_choice !== "Price" ? (<div id="summaryitemvalue">{value.value}</div>) : ("")}
                            </div>

                        )
                    })}
                </div >) : (<div></div>)}
        </div>
    );
}

export default SummaryItemCard;
