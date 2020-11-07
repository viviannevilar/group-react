import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";

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
    const history = useHistory();

    // state variables
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState(false);
    const [collectionData, setCollectionData] = useState({ collection_items: [] });
    const [itemData, setItemData] = useState([]);
    const [itemDisplayData, setItemDisplayData ] = useState([])


    const [ activePath, setActivePath ] = useState("active-items")
    // 'items/'
    // 'archived-items/'
    // 'active-items/'

    const [ filterChoice, setFilterChoice ] = useState("active")
    

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

            const filteredData = data.collection_items.filter((item) => item.is_active)
            console.log(filteredData)
            setItemDisplayData(filteredData)
            setisLoading(false);
        } else {
            setisLoading(false);
            setError(data);
            setErrorMessage(true);
        }

    }

    ////////       functions to filter active-archived-all items       ////////


    useEffect(() => {



    }, [])

    const filterActive = () => {
        setFilterChoice("active")
        //setActivePath("active-items")
        const filteredData = itemData.filter((item) => item.is_active)
        setItemDisplayData(filteredData)


    }

    const filterArchived = () => {
        setFilterChoice("archived")
        //setActivePath("archived-items")
    }

    const filterAll = () => {
        setFilterChoice("all")
        //setActivePath("items")
    }


      



    ////////       functions to sort items       ////////

    // sort by price, lowest to highest
    const sortAscending = () => {
        const sorted = [...itemData].sort((a, b) => a.price - b.price) 
        //see explanation at the end of this file to understand this a bit more
        setItemData(sorted)
    }
    
    // sort by price, highest to lowest
    const sortDescending = () => {
        const sorted = [...itemData].sort((a, b) => a.price - b.price).reverse()
        setItemData(sorted)
    }

    // sort by date created, oldest to newest
    const sortCreated = () => {
        const sorted = [...itemData].sort((a, b) => a.id - b.id) 
        setItemData(sorted)
    }

    // sort by date created, oldest to newest
    const sortCreatedReverse = () => {
        const sorted = [...itemData].sort((a, b) => a.id - b.id).reverse
        setItemData(sorted)
    }
    
    const sortModified = () => {
        const sorted = [...itemData].sort((a,b) => new Date(a.last_updated) - new Date(b.last_updated))
        setItemData(sorted)
    }


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

                        <select onChange={(e) => setFilterChoice(e.target.value)}>
                            <option value="all">All items</option>
                            <option value="active">Active items</option>
                            <option value="archived">Archived items</option>
                        </select>
                        {/* buttons to sort data */}
                        <button onClick={sortAscending}>Sort by Price asc</button>
                        <button onClick={sortDescending}>Sort by Price desc</button>
                        <button onClick={sortCreated}>Sort by Created</button>
                        <button onClick={sortModified}>Sort by Modified</button>

                        {/* show items list, and this list will be sorted according to the button that has been pressed above */}
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


