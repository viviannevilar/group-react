import React, { useRef, useEffect, useState } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import "./CollectionDetailPage.css";
import Nav from "../../components/Nav/Nav";
import SummaryItemCard from "../../components/SummaryItemCard/SummaryItemCard";

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
    console.log(shared_link)

    // Collection ID, Loading states and modal states
    const history = useHistory();
    const [isLoading, setisLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [summarymodalState, setSummaryModalState] = useState(false);

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

    // summary variables:
    const [summaryChoice, setSummaryChoice] = useState("price")

    const [summaryModal, setSummaryModal] = useState(false)
    const [summaryInfo, setSummaryInformation] = useState([])
    const [summaryTitle, setsummaryTitle] = useState("Price")




    // functions:

    // Modal state change function:
    const addItemToggleModalState = () => {
        setModalState(!modalState);
        window.scrollTo(0, 0);
    };


    const summaryToggleState = () => {
        setSummaryModal(!summaryModal);
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




    useEffect(() => {

        if (summaryChoice === "price") {

            var key_information = itemData.map(function (item, index) {
                return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.price };
            })
            setSummaryInformation(key_information)
            setsummaryTitle("Price")

            console.log(key_information)

        } else if (summaryChoice === "sale_amount") {

            var key_information = itemData.map(function (item, index) {
                return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.sale_amount, end_date: item.sale_end_date };
            })
            setSummaryInformation(key_information)
            setsummaryTitle("Discounted By")

            console.log(key_information)


        } else if (summaryChoice === "attribute1") {

            var key_information = itemData.map(function (item, index) {
                return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.attribute1 };
            })
            setSummaryInformation(key_information)
            setsummaryTitle(collectionData.attribute1)

            console.log(key_information)

        } else if (summaryChoice === "attribute2") {

            var key_information = itemData.map(function (item, index) {
                return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.attribute2 };
            })
            setSummaryInformation(key_information)
            setsummaryTitle(collectionData.attribute2)

            console.log(key_information)

        } else if (summaryChoice === "attribute3") {


            var key_information = itemData.map(function (item, index) {
                return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.attribute3 };
            })
            setSummaryInformation(key_information)
            setsummaryTitle(collectionData.attribute3)

            console.log(key_information)

        } else {

            console.log("Error in summaryChoice. summaryChoice chosen doesn't match any of the attributes, attribute = ", summaryChoice)

        }

    }, [summaryChoice])





    // Set up data for inside slider
    const slides = [];
    itemDisplayData.map((projectData, key) => {
        slides.push(
            <SwiperSlide key={`slide-${key}`}>
                <div class="item-container">
                    <div className="itemcardcontainer">
                        <ItemCard key={key} projectData={projectData} collectionData={collectionData} />
                    </div>
                    {shared_link === "private" && (
                        <div className="buttoncontainer">
                            <Link to={`/item-edit/${projectData.id}/${collectionData.id}/`}>
                                <button className="buttonblue" >Edit </button >
                            </Link>
                            <a><button className="buttonblue" onClick={() => archiveItem(projectData)}>{projectData.is_active ? "Archive" : "Unarchive"}</button></a>
                            <a><button className="buttonblue" onClick={() => handleDelete(projectData)}>Delete </button></a>

                        </div>
                    )}

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
                            <div id="fexrow">
                                <p>Summarise by: </p>
                                <select onChange={(e) => setSummaryChoice(e.target.value)}>
                                    <option value="none" selected disabled hidden></option>


                                    <option value="price">Price</option>
                                    <option value="sale_amount">Discount</option>
                                    {collectionData.attribute1 !== "" && (<option value="attribute1">{collectionData.attribute1}</option>
                                    )}
                                    {collectionData.attribute2 !== "" && (<option value="attribute2">{collectionData.attribute2}</option>
                                    )}
                                    {collectionData.attribute3 !== "" && (<option value="attribute3">{collectionData.attribute3}</option>
                                    )}
                                    {collectionData.attribute4 !== "" && (<option value="attribute4">{collectionData.attribute4}</option>
                                    )}
                                </select>
                                <button className="buttonblue" onClick={() => summaryToggleState()}>GO</button>
                            </div>



                            {shared_link === "private" ? (
                                <div className="CollectionInformationContainer">
                                    { collectionData.collection_items.length > 0 && (<p>You are currently comparing {itemDisplayData.length} items in {collectionData.title} list. </p>)}
                                    {collectionData.collection_items.length === 0 && (<p>You are yet to add any items to {collectionData.title}!</p>)}
                                    {collectionData.is_active && (
                                        <button className="buttonblue" onClick={() => addItemToggleModalState()}>Add Item</button>
                                    )}
                                    {!collectionData.is_active && (
                                        <p>This list is archived, please unarchive to add new items</p>)}
                                </div>
                            ) : (<div>
                                { collectionData.collection_items.length > 0 && (<p>There are currently {collectionData.collection_items.length} items in the {collectionData.title} list for comparison. </p>)}
                                {collectionData.collection_items.length === 0 && (<p>There are no items added to list {collectionData.title}!</p>)}
                            </div>)}

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





                            <div id="project-list">


                                {/* {itemDisplayData.map((projectData, key) => {
                                    return (
                                        <div>
                                            <ItemCard key={key} projectData={projectData} collectionData={collectionData} />

                                            {shared_link === "private" && (
                                                <div>
                                                    <button className={`button-delete${key}`} onClick={() => handleDelete(projectData)}>Delete Item: {projectData.name} </button>
                                                    <Link to={`/item-edit/${projectData.id}/${collectionData.id}/`}>
                                                        <button>Edit Item</button >
                                                    </Link>
                                                    <button onClick={() => archiveItem(projectData)}>{projectData.is_active ? "Archive" : "Unarchive"}</button>
                                                </div>
                                            )}

                                        </div>)

                                })
                                } */}

                                <React.Fragment>
                                    <div className="areyoutheproblem" style={modalState || summaryModal ? { pointerEvents: "none", opacity: "0.4" } : {}} >
                                        <Swiper

                                            breakpoints={{
                                                // when window width is >= 640px
                                                400: {
                                                    width: 400,
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,

                                                },
                                                // when window width is >= 768px
                                                768: {
                                                    width: 768,
                                                    slidesPerView: 2,
                                                    spaceBetween: 30,

                                                },

                                                1000: {
                                                    width: 1000,
                                                    slidesPerView: 3,
                                                    spaceBetween: 40,

                                                },
                                            }}
                                            id="main"
                                            thumbs={{ swiper: thumbsSwiper }}
                                            controller={{ control: controlledSwiper }}
                                            tag="section"
                                            wrapperTag="ul"
                                            navigation
                                            pagination
                                            spaceBetween={1}
                                            centeredSlides={true}
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


                        <div className={`modalBackground modalShowing-${summaryModal}`}>
                            <div className="modalInner">
                                <div className="modalText">
                                    <SummaryItemCard summary_choice={summaryTitle} summary_info={summaryInfo} />
                                    <div>
                                        <button className="exitButton" onClick={() => summaryToggleState()}> exit </button>
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
        </div >

    )
}

export default CollectionDetailPage;
