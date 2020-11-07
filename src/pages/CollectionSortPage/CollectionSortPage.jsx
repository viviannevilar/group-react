import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
}

function CollectionSortPage() {

    //////////////////////////// variables ////////////////////////////

    // to use in the html
    const imageError = "https://www.pngitem.com/pimgs/m/119-1190787_warning-alert-attention-search-error-icon-hd-png.png"

    // tokens, ids, location, history
    let token = window.localStorage.getItem("token");
    const { id } = useParams();

    // state variables
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState(false);
    const [collectionData, setCollectionData] = useState({ collection_items: [] });
    const [itemData, setItemData] = useState([]);
    const [itemDisplayData, setItemDisplayData ] = useState([])

    const [ filterChoice, setFilterChoice ] = useState("all")
    const [ orderChoice, setOrderChoice ] = useState("date-modified")
    

    //////////////////////////// methods ////////////////////////////

    ////////       functions to fetch collections       ////////
    useEffect(() => {
        fetchCollections()
    }, [id]);

    const fetchCollections = async () => {
        let response
        try {
            response = await fetch(`${process.env.REACT_APP_API_URL}collection/${id}/`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            })
        } catch (error) {
            setisLoading(false);
            setErrorMessage(true);
            setError(error);
            return
        }

        const data = await response.json();

        if (response.ok) {
            setCollectionData(data);
            setItemData(data.collection_items);
            setItemDisplayData(data.collection_items)
            console.log(data.collection_items)
            setisLoading(false);
        } else {
            setisLoading(false);
            setError(data);
            setErrorMessage(true);
        }

    }

    ////////       functions to filter active-archived-all items       ////////

    ////////       filter by item.is_active       ////////


    useEffect(() => {

        let filteredData

        if (filterChoice === "active") {

            filteredData = itemData.filter((item) => item.is_active)
            setItemDisplayData(filteredData)
            console.log("active filtering")

        } else if (filterChoice === "archived") {

            filteredData = itemData.filter((item) => !item.is_active)
            setItemDisplayData(filteredData)
            console.log("archive filtering")

        } else if (filterChoice === "all") {

            setItemDisplayData(itemData)
            console.log("no filtering - all items")

        } else {

            console.log("Error in filters. Filter chosen doesn't match any of the filter options. filterChoice = ", filterChoice)

        }

    }, [filterChoice, itemData])


    ////////       order items by price, date       ////////

    let sorted

    useEffect(() => {

        if (orderChoice === "price-lh") {

            sorted = [...itemDisplayData].sort((a, b) => a.price - b.price) 
            //see explanation at the end of this file to understand this a bit more
            setItemDisplayData(sorted)
            console.log("price-lh ordering")

        } else if (orderChoice === "price-hl") {

            sorted = [...itemDisplayData].sort((a, b) => a.price - b.price).reverse()
            setItemDisplayData(sorted)
            console.log("price-hl ordering")


        } else if (orderChoice === "date-created") {

            sorted = [...itemDisplayData].sort((a, b) => a.id - b.id) 
            setItemDisplayData(sorted)
            console.log("date-created ordering")

        } else if (orderChoice === "date-modified") {

            sorted = [...itemDisplayData].sort((a,b) => new Date(a.last_updated) - new Date(b.last_updated))
            setItemDisplayData(sorted)
            console.log("date-modified ordering")

        } else {

            console.log("Error in ordering. Order chosen doesn't match any of the order options. orderChoice = ", orderChoice)

            console.log("error ordering")

        }

    }, [orderChoice])



    //////////////////////////// return ////////////////////////////
     
    return (
        <div id="projectlistcenter">

            {/* *******      if there is no error message and 
                             if it is no longer waiting for the fetch  ******** */}
            {(!isLoading && !errorMessage) ? (

                <div>
                    <div id="App">

                        {/* collection information */}
                        <p>Collection of {collectionData.title} </p>
                        <p>Date Created {formatDate(collectionData.date_created)} </p>
                        <p>Last Updated {formatDate(collectionData.last_updated)} </p>

                        {/* first drop down - filter choices */}
                        <select onChange={(e) => setFilterChoice(e.target.value)}>
                            <option value="all">All items</option>
                            <option value="active">Active items</option>
                            <option value="archived">Archived items</option>
                        </select>

                        {/* second drop down - order choices */}
                        <select onChange={(e) => setOrderChoice(e.target.value)}>
                            <option value="date-modified">Date modified</option>
                            <option value="price-lh">Price - low to high</option>
                            <option value="price-hl">Price - high to low</option>
                            <option value="date-created">Date created</option>
                        </select>


                        {/* show items list, sorted according to the button that has been pressed above */}
                        <div id="project-list">
                            {itemDisplayData.map((item, key) => {
                                return (
                                    <div key={key}>
                                        <p>{item.id} - {item.name} - {item.price}</p>
                                    </div>)
                            })}
                        </div>

                    </div>
                </div>

            ) : null }

            {/* *******      if there IS an error message and 
                             if it is no longer waiting for the fetch  ******** */}
            {(!isLoading && errorMessage) ? (

                <div>
                    <div id="errormessage">
                        <br></br>
                        <img className="backgroundimage" alt="Error!" src={imageError} />

                        <h2 id="headerTitle">There is no collection with ID {id} </h2>
                    </div>
                </div>

            ) : null }

            {/* *******      if there IS an error message and 
                             if it is no longer waiting for the fetch  ******** */}
            {(isLoading) ? (

                <div>
                    <div>
                        <div>
                            <img alt="" src={imageError} />
                        </div>
                        {/* <Loader /> */}
                    </div>
                </div>

            ) : null }

        </div >

    )
}

export default CollectionSortPage;





// if I had used 
// const sorted = itemData.sort((a, b) => a.price - b.price) 
// instead of 
// const sorted = [...itemData].sort((a, b) => a.price - b.price) 
// it wouldn't work. See explanation here
// https://dev.to/ramonak/react-how-to-dynamically-sort-an-array-of-objects-using-the-dropdown-with-react-hooks-195p


