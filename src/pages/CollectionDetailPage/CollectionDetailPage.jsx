import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";

function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
}

// List of items print out
// Each attribute is clickable and takes you to a pop up modal that compares the items
// Items at phone screen width are swipeable
// Add item - form - pop up modal or new form we will see
// Edit each item with a button - pop up

function CollectionDetailPage() {
    let token = window.localStorage.getItem("token");

    const history = useHistory();
    const [isLoading, setisLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState(false);
    const [DeleteState, setDeleteState] = useState(false);

    const toggleModalState = () => {
        setModalState(!modalState);
        window.scrollTo(0, 0);
    };


    const toggleDelete = () => {
        setDeleteState(!DeleteState);
        window.scrollTo(0, 0);
    };

    const [collectionData, setCollectionData] = useState({ collection_items: [] });
    const [itemData, setItemData] = useState([]);

    const { id } = useParams();




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
            setError(data);
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

    const handleDelete = (e) => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}collection/${id}/`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }).then(() => {
            history.push("/")
        });
    }



    return (
        <div id="projectlistcenter">

            {!isLoading && errorMessage && (<div>

                <div id="errormessage">
                    <br></br>
                    <img className="backgroundimage" src="https://www.pngitem.com/pimgs/m/119-1190787_warning-alert-attention-search-error-icon-hd-png.png" />
                    <h2 id="headerTitle">There is no collection with ID {id} </h2>
                </div>
            </div>)}


            {!isLoading && !errorMessage && (
                <div>
                    <p>See your collection of {collectionData.title} </p>
                    <p>Date Created {formatDate(collectionData.date_created)} </p>
                    <p>Last Updated {formatDate(collectionData.last_updated)} </p>
                    <div id="project-list">
                        {itemData.reduce((total, projectData, key) => {
                            total.push(<ItemCard key={key} projectData={projectData} collectionData={collectionData} />);
                            return total;
                        }, [])}
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

export default CollectionDetailPage;
