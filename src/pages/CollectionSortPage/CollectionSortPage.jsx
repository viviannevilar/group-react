import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";



function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
}


function CollectionSortPage() {
    let token = window.localStorage.getItem("token");
    const { id } = useParams();
    const history = useHistory();
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState(false);
    const [collectionData, setCollectionData] = useState({ collection_items: [] });
    const [itemData, setItemData] = useState([]);


    const fetchProjects = async () => {
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
            console.log(data)
            console.log(data.collection_items)

            setCollectionData(data);
            setItemData(data.collection_items);
            setisLoading(false);

        } else {
            setisLoading(false);
            setError(data);
            setErrorMessage(true);
        }

    }

    let sortedItemData

    const sortAscending = () => {
        itemData.sort((a, b) => a.price - b.price)  
        sortedItemData = itemData
    }

    
    const sortDescending = () => {
        itemData.sort((a, b) => a.price - b.price).reverse()
      }

    const sortCreated = () => {
        itemData.sort((a, b) => a.id - b.id) 
    }
    

    useEffect(() => {
        fetchProjects()
    }, [id]);




    return (
        <div id="projectlistcenter">

            {!isLoading && errorMessage && (<div>

                <div id="errormessage">
                    <br></br>
                    <img className="backgroundimage" alt="Error!" src="https://www.pngitem.com/pimgs/m/119-1190787_warning-alert-attention-search-error-icon-hd-png.png" />
                    <h2 id="headerTitle">There is no collection with ID {id} </h2>
                </div>
            </div>)}


            {!isLoading && !errorMessage && (
                <div>
                    <div id="App">
                        <p>Collection of {collectionData.title} </p>

                        <p>Date Created {formatDate(collectionData.date_created)} </p>
                        <p>Last Updated {formatDate(collectionData.last_updated)} </p>


                        <button onClick={sortAscending}>Sort by Price asc</button>
                        <button onClick={sortDescending}>Sort by Price desc</button>
                        <button onClick={sortCreated}>Sort by Created</button>

                        <div id="project-list">
                            {itemData.map((item, key) => {
                                return (
                                    <div>
                                        {item.name} - {item.price}
                                    </div>)

                            })}
                        </div>


                    </div>


                </div>
            )
            }

            <div>
                {isLoading && (
                    <div>
                        <div>IS Loading</div>
                        {/* <Loader /> */}
                    </div>
                )}
            </div>
        </div >

    )
}

export default CollectionSortPage;
