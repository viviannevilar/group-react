import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";
import nophoto from '../../images/noimage.PNG';
import pricetag from "../../images/img_568452.png"
import discountend from "../../images/download.png"
import scrolldown from "../../images/scrolldown.png"
import scrollup from "../../images/scrollup.png"
import archiveicon from "../../images/archive.png"


import "../../components/Nav/Nav.css";

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

function calculateDiscount(price, discount) {


    var total_saving = parseInt(price) * (discount / 100)
    console.log("price: ", price)
    console.log("discount: ", discount)
    console.log("total saving: ", Math.round(total_saving, 3))
    return Math.round(total_saving, 3)
}
function calculateNewPrice(oldprice, totalsaving) {
    var updateprice = parseInt(oldprice) - parseInt(totalsaving)
    return updateprice
}




// Phone detail handling:


function ItemCard(props) {

    const { projectData, collectionData } = props;
    const myRef = useRef(null)
    const hideDetailsRef = useRef(null)

    const [displayDetails, setdisplayDetails] = useState(false)
    const [buttonDetails, setbuttonDetails] = useState(true)
    const [dateDiff, setDateState] = useState(null)
    const [emptyAttributes, setemptyAttributes] = useState([])



    const executeScroll = () => {
        setbuttonDetails(false)
        setdisplayDetails(true)
        myRef.current.scrollIntoView({
            behavior: 'smooth',
        })

    };

    const executeHide = () => {
        hideDetailsRef.current.scrollIntoView({
            behavior: 'smooth',
        })
        setdisplayDetails(false)
        setbuttonDetails(true)
    };

    useEffect(() => {

        if (collectionData !== undefined) {
            if (projectData.sale_end_date !== null) {
                var current_date = formatDate(new Date());
                const diffInMs = (new Date(projectData.sale_end_date) - new Date(current_date))
                const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24), 2);
                setDateState(diffInDays)
            }
            let attributelist = []

            if (projectData.attribute1 === "" && collectionData.attribute1 !== "") {
                attributelist.push(collectionData.attribute1);
            }
            if (projectData.attribute2 === "" && collectionData.attribute2 !== "") {
                attributelist.push(collectionData.attribute2);
            }
            if (projectData.attribute3 === "" && collectionData.attribute3 !== "") {
                attributelist.push(collectionData.attribute3);
            }

            if (projectData.attribute4 === "" && collectionData.attribute4 !== "") {
                attributelist.push(collectionData.attribute4);
            }

            setemptyAttributes(attributelist.join(", "))
            //console.log(projectData.price)


        }

    }, [projectData, collectionData]);


    return (

        <div className="project-card" id={projectData.is_active === false ? "project-closed" : "project-open"}>
            <div id="onDisplayInfo">
                <p id="titlep" ref={hideDetailsRef} >{projectData.name.toUpperCase()}</p>
                {projectData.image !== null ? <img className="item" alt="Item" src={projectData.image} /> : <img className="item" alt="Item" src={nophoto} />}

                {/* <div className="item">
                    {projectData.image !== null ? <img className="item" alt="Item" src={projectData.image} /> : <img className="item" alt="Item" src={nophoto} />}
                    {parseInt(projectData.sale_amount) !== 0 && (<span className="notify-badge"> {projectData.sale_amount}% OFF</span>)}
                </div> */}
                <div className="discountcontainer">
                    <div className="priceSummary">
                        <img className="priceicon" alt="priceicon" src={pricetag} />

                        {projectData.price !== null && projectData.price !== ""  
                        ? (<div> { parseInt(projectData.sale_amount) !== 0 && parseInt(projectData.sale_amount) !== null
                           ? (<p className={parseInt(projectData.sale_amount) !== 0 && parseInt(projectData.sale_amount) !== null ? "onsale" : "item"} > 
                           ${calculateNewPrice(projectData.price, calculateDiscount(projectData.price, projectData.sale_amount))}   (<strike>${projectData.price}</strike>) </p>) 
                           : <p>${projectData.price} </p>}
                           </div>) 
                        : (<div><p>NO PRICE INFORMATION PROVIDED</p></div>)}
                    </div>
                    <div className="DiscountEndDate">
                        {parseInt(projectData.sale_amount) !== 0 && projectData.sale_end_date !== null && (<img className="priceicon" alt="discountend" src={discountend} />)}
                        {parseInt(projectData.sale_amount) !== 0 && projectData.sale_end_date !== null && dateDiff > 0 ? (<p>{projectData.sale_amount}% ends -  {formatDate(projectData.sale_end_date)}  </p>) : (<br></br>)}
                        {parseInt(projectData.sale_amount) !== 0 && projectData.sale_end_date !== null && dateDiff <= 0 ? (<p>{projectData.sale_amount}% expired on the {formatDate(projectData.sale_end_date)}  </p>) : (<br></br>)}

                    </div>
                </div>
                <div onClick={executeScroll} id="scrolldowndetails">
                    {buttonDetails ? (<img style={{ cursor: "pointer" }} className="scrolldown" alt="scrolldown" src={scrolldown} />) : ("")}
                    {buttonDetails ? (<p style={{ cursor: "pointer" }}> SEE ITEM DETAILS</p>) : ("")}
                </div>
            </div>

            <div className="project-infosummary">
                <div ref={myRef}>
                    {!projectData.is_active ? (<div className="priceSummary">
                        <img className="changeicons" alt="archiveicon" src={archiveicon} />
                        <p className="archiveitemp">Archived</p>
                    </div>) : ("")}
                    {projectData.price != null ? (<div> { parseInt(projectData.sale_amount) !== 0 ? (<p className={parseInt(projectData.sale_amount) !== 0 ? "onsale" : "item"} > <span id="attributetext"> Price </span>: ${calculateNewPrice(projectData.price, calculateDiscount(projectData.price, projectData.sale_amount))}   (<strike>${projectData.price}</strike>) </p>) : <p> <span id="attributetext"> Price </span> ${projectData.price} </p>}
                    </div>) : (<div><p id="emptyattributelsit">No price provided</p></div>)}
                    {collectionData.attribute1 !== "" && projectData.attribute1 !== "" ? (<p> <span id="attributetext"> {collectionData.attribute1} </span>:  {projectData.attribute1}</p>) : ("")}
                    {collectionData.attribute2 !== "" && projectData.attribute2 !== "" ? (<p><span id="attributetext"> {collectionData.attribute2}  </span>:  {projectData.attribute2}</p>) : ("")}
                    {collectionData.attribute3 !== "" && projectData.attribute3 !== "" ? (<p><span id="attributetext"> {collectionData.attribute3}  </span>:  {projectData.attribute3}</p>) : ("")}
                    {collectionData.attribute4 !== "" && projectData.attribute4 !== "" ? (<p> <span id="attributetext" >{collectionData.attribute4} </span> : { projectData.attribute4}</p>) : ("")}
                    {emptyAttributes.length > 0 ? (<p id="emptyattributelsit">This item does not currently have any information added for collection attributes: {emptyAttributes}. </p>) : ("")}
                    <p> <span id="attributetext"> Notes: </span> </p>
                    <p className="notesbox"> {projectData.notes} {projectData.notes !== "" ? "" : "No additional notes for this item"} </p>


                    <div onClick={executeHide} id="scrolldowndetails">
                        {!buttonDetails ? (<img style={{ cursor: "pointer" }} className="scrolldown" alt="scrollup" src={scrollup} />) : ("")}
                        {!buttonDetails ? (<p style={{ cursor: "pointer" }}> HIDE DETAILS</p>) : ("")}
                    </div>

                </div>
            </div>
        </div >
    );
}

export default ItemCard;
