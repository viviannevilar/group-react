import React, { useRef, useEffect, useState } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import "./CollectionDetailPage.css";
import Nav from "../../components/Nav/Nav";


// Swiper copies
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);


function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
}

// List of items print out
// Each attribute is clickable and takes you to a pop up modal that compares the items
// Items at phone screen width are swipeable

function CollectionDetailPage() {

    // Variable for colelction ID
    const { id } = useParams();


    // Variables to understand if public or private path
    let urlPath
    let shared_link
    let token = window.localStorage.getItem("token");
    const location = useLocation();
    const urlComponents = location.pathname.split("/")

    if (urlComponents.length === 6) {
        urlPath = "safe/" + id + "/" + urlComponents[4]
        shared_link = "public"
    } else {
        urlPath = id
        shared_link = "private"
    }


    // Collection ID, Loading states and modal states
    const history = useHistory();
    const [isLoading, setisLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState(false);
    const [collectionData, setCollectionData] = useState({ collection_items: [] });
    const [itemData, setItemData] = useState([]);

    // testing swiper state variables
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);

    // ordering and filtering state variables
    const [filterChoice, setFilterChoice] = useState("all")
    const [orderChoice, setOrderChoice] = useState("date-modified")
    const [itemDisplayData, setItemDisplayData] = useState([])


    // functions:

    // Modal state change function:
    const addItemToggleModalState = () => {
        setModalState(!modalState);
        window.scrollTo(0, 0);
    };


    // Fetch Collection Data and Items
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
            setCollectionData(data);
            setItemData(data.collection_items);
            setItemDisplayData(data.collection_items)

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


    // Delete Item
    const handleDelete = (projectdat, e) => {
        //let token = localStorage.getItem("token");
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

    // Archive Item
    const archiveItem = (projectdat, e) => {
        let token = window.localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}item/${projectdat.id}/archive/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }).then(() => {
            history.push(`/collection/${id}/`)
            window.location.reload();
        });
    }

    ////////       filter active-archived-all items       ////////
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

            sorted = [...itemData].sort((a, b) => a.price - b.price)
            //see explanation at the end of this file to understand this a bit more
            setItemData(sorted)
            console.log("price-lh ordering")

        } else if (orderChoice === "price-hl") {

            sorted = [...itemData].sort((a, b) => a.price - b.price).reverse()
            setItemData(sorted)
            console.log("price-hl ordering")


        } else if (orderChoice === "date-created") {

            sorted = [...itemData].sort((a, b) => a.id - b.id)
            setItemData(sorted)
            console.log("date-created ordering")

        } else if (orderChoice === "date-modified") {

            sorted = [...itemData].sort((a, b) => new Date(a.last_updated) - new Date(b.last_updated))
            setItemData(sorted)
            console.log("date-modified ordering")

        } else {

            console.log("Error in ordering. Order chosen doesn't match any of the order options. orderChoice = ", orderChoice)

        }

    }, [orderChoice])


    // Set up data for inside slider
    const slides = [];
    itemDisplayData.map((item, key) => {
        slides.push(
            <SwiperSlide key={`slide-${key}`}>
                <div>
                    <ItemCard key={key} item={item} collectionData={collectionData} />

                </div>
            </SwiperSlide>
        );
    })

    return (
        <div id="Nav">
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
                            {/* collection information */}

                            {shared_link == "private" && (<p>See your collection of {collectionData.title} </p>)}
                            {shared_link == "public" && (<p>Collection of {collectionData.title} </p>)}
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

                            {shared_link === "private" && (
                                <div>
                                    { itemDisplayData.length > 0 && (<p>You are currently comparing {itemDisplayData.length} items in {collectionData.title} list. </p>)}
                                    {itemDisplayData.length === 0 && (<p>You are yet to add any items to {collectionData.title}!</p>)}
                                    {collectionData.is_active && (
                                        <button className="button" onClick={() => addItemToggleModalState()}>Add Item</button>
                                    )}
                                    {!collectionData.is_active && (
                                        <p>This list is archived, please unarchive to add new items</p>)}
                                </div>
                            )}

                            {shared_link === "public" && (
                                <div>
                                    { itemDisplayData.length > 0 && (<p>There are currently {itemDisplayData.length} items in the {collectionData.title} list for comparison. </p>)}
                                    {itemDisplayData.length === 0 && (<p>There are no items added to list {collectionData.title}!</p>)}
                                </div>
                            )}



                            <div id="project-list">


                                {/* {itemDisplayData.map((item, key) => {
                                    return (
                                        <div>
                                            <ItemCard key={key} item={item} collectionData={collectionData} />

                                            {shared_link === "private" && (
                                                <div>
                                                    <button className={`button-delete${key}`} onClick={() => handleDelete(item)}>Delete Item: {item.name} </button>
                                                    <Link to={`/item-edit/${item.id}/${collectionData.id}/`}>
                                                        <button>Edit Item</button >
                                                    </Link>
                                                    <button onClick={() => archiveItem(item)}>{item.is_active ? "Archive" : "Unarchive"}</button>
                                                </div>
                                            )}

                                        </div>)

                                })
                                } */}

                                <React.Fragment>
                                    <div style={modalState ? { pointerEvents: "none", opacity: "0.4" } : {}} >
                                        <Swiper
                                            // breakpoints={{
                                            //     // when window width is >= 640px
                                            //     400: {
                                            //         width: 400,
                                            //         slidesPerView: 1,
                                            //     },
                                            //     // when window width is >= 768px
                                            //     768: {
                                            //         width: 768,
                                            //         slidesPerView: 2,
                                            //     },

                                            //     1000: {
                                            //         width: 1000,
                                            //         slidesPerView: 5,
                                            //     },
                                            // }}
                                            id="main"
                                            thumbs={{ swiper: thumbsSwiper }}
                                            controller={{ control: controlledSwiper }}
                                            tag="section"
                                            wrapperTag="ul"
                                            navigation
                                            pagination
                                            spaceBetween={0}
                                            slidesPerView={1}
                                            onInit={(swiper) => console.log('Swiper initialized!', swiper)}
                                            onSlideChange={(swiper) => {
                                                console.log('Slide index changed to: ', swiper.activeIndex);
                                            }}
                                            onReachEnd={() => console.log('Swiper end reached')}
                                        >
                                            {slides}
                                        </Swiper>
                                    </div>

                                </React.Fragment>

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



