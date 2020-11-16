import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import "./CollectionDetailPage.css";
import Nav from "../../components/Nav/Nav";


function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
}

function CollectionDetailPage() {
    let urlPath
    let shared_link
    //let token = window.localStorage.getItem("token");
    const location = useLocation();
    const urlComponents = location.pathname.split("/")
    const { id } = useParams();
    const history = useHistory();
    const [isLoading, setisLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [editmodalState, setEditModalState] = useState(false);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState(false);
    const [collectionData, setCollectionData] = useState({ collection_items: [] });
    const [itemData, setItemData] = useState([]);

    const addItemToggleModalState = () => {
        setModalState(!modalState);
        window.scrollTo(0, 0);
    };

    const editItemToggleModalState = () => {
        setEditModalState(!editmodalState);
        window.scrollTo(0, 0);
    };

    console.log(urlComponents)
    if (urlComponents.length === 6) {
        urlPath = "safe/" + id + "/" + urlComponents[4]
        shared_link = "public"
    } else {
        urlPath = id
        shared_link = "private"
    }

    const fetchProjects = async () => {
        let response
        try {
            if (urlComponents.length === 4) {
                response = await fetch(`${process.env.REACT_APP_API_URL}collection/${id}/`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                })
            } else {
                response = await fetch(`${process.env.REACT_APP_API_URL}collection/${urlPath}/`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            }
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

    useEffect(() => {
        fetchProjects()
    }, [id]);

    const handleDelete = (projectdat, e) => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}item/${projectdat.id}/`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }).then(() => {
            history.push(`/collection/${id}/`)
            window.location.reload();
        });
    }



    return (
        <div>
        <div>
            <Nav />
        </div>
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
                        {shared_link == "private" && (<p>See your collection of {collectionData.title} </p>)}
                        {shared_link == "public" && (<p>Collection of {collectionData.title} </p>)}

                        <p>Date Created {formatDate(collectionData.date_created)} </p>
                        <p>Last Updated {formatDate(collectionData.last_updated)} </p>

                        {shared_link === "private" && (
                            <div>
                                { collectionData.collection_items.length > 0 && (<p>You are currently comparing {collectionData.collection_items.length} items in {collectionData.title} list. </p>)}
                                {collectionData.collection_items.length === 0 && (<p>You are yet to add any items to {collectionData.title}!</p>)}
                                {collectionData.is_active && (
                                    <button className="button" onClick={() => addItemToggleModalState()}>Add Item</button>
                                )}
                                {!collectionData.is_active && (
                                    <p>This list is archived, please unarchive to add new items</p>)}
                            </div>
                        )}

                        {shared_link === "public" && (
                            <div>
                                { collectionData.collection_items.length > 0 && (<p>There are currently {collectionData.collection_items.length} items in the {collectionData.title} list for comparison. </p>)}
                                {collectionData.collection_items.length === 0 && (<p>There are no items added to list {collectionData.title}!</p>)}
                            </div>
                        )}



                        <div id="project-list">
                            {itemData.map((projectData, key) => {
                                return (
                                    <div>
                                        <Link to={`/item-edit/${projectData.id}/${collectionData.id}/`}>
                                            <p>Edit Item</p>
                                        </Link>
                                        <ItemCard key={key} projectData={projectData} collectionData={collectionData} />

                                        {shared_link === "private" && (
                                            <div>
                                                <button className={`button-delete${key}`} onClick={() => handleDelete(projectData)}>Delete Item: {projectData.name} </button>
                                            </div>
                                        )}

                                    </div>)

                            })
                            }
                        </div>
                    </div>

                    <div className={`modalBackground modalShowing-${modalState}`}>
                        <div className="modalInner">
                            <div className="modalText">
                                <AddItemForm id={id} collectionData={collectionData} />
                                <div>
                                    <button className="exitButton" onClick={() => addItemToggleModalState()}> exit </button>
                                </div>
                            </div>
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
    </div>
    )
}

export default CollectionDetailPage;
