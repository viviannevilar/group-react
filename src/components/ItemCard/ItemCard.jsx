import React from "react";
//import { Link } from "react-router-dom";
import "./ItemCard.css";
import nophoto from '../../images/noimage.PNG';
import pricetag from "../../images/img_568452.png"
import "../../components/Nav/Nav.css";

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



function ItemCard(props) {

    const { projectData, collectionData } = props;


    return (

        <div className="project-card" id={projectData.is_active === false ? "project-closed" : "project-open"}>
            <p>{projectData.name.toUpperCase()}</p>

            <div className="item">
                <a href="#">
                    {projectData.image !== null ? <img className="item" alt="Item" src={projectData.image} /> : <img className="item" alt="Item" src={nophoto} />}
                    {parseInt(projectData.sale_amount) !== 0 && (<span className="notify-badge"> {projectData.sale_amount}% OFF</span>)}

                </a>
            </div>


            <div className="project-infosummary">
                <div className="priceSummary">
                    <img className="priceicon" alt="priceicon" src={pricetag} />
                    {parseInt(projectData.sale_amount) !== 0 ? (<p className={parseInt(projectData.sale_amount) !== 0 ? "onsale" : "item"} > ${calculateNewPrice(projectData.price, calculateDiscount(projectData.price, projectData.sale_amount))}   (<strike>${projectData.price}</strike>) </p>) : <p>${projectData.price} </p>}
                </div>
                {parseInt(projectData.sale_amount) !== 0 && projectData.sale_end_date !== null && (<p>Sale End Date: {formatDate(projectData.sale_end_date)}  </p>)}
                {collectionData.attribute1 !== "" && (<p>{collectionData.attribute1}:  {projectData.attribute1} {projectData.attribute1 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute2 !== "" && (<p>{collectionData.attribute2}:  {projectData.attribute2} {projectData.attribute2 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute3 !== "" && (<p>{collectionData.attribute3}:  {projectData.attribute3} {projectData.attribute3 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute4 !== "" && (<p>{collectionData.attribute4}:  {projectData.attribute4} {projectData.attribute4 !== "" ? "" : "No information added for this attribute"}  </p>)}
                <p className="cat">{projectData.is_active ? "Active" : "Archived"}</p>
                <p className="cat">Notes: {projectData.notes} {projectData.notes !== "" ? "" : "No additional notes for this item"} </p>

                {!projectData.is_active && (
                    <p id="author" className="cat">Item: {projectData.name.toUpperCase()} is currently archived and does not appear in attribute comparisons</p>
                )}

            </div>
        </div>
    );
}

export default ItemCard;
