//////////////////////////// imports ////////////////////////////

// react imports
import React, { useRef, useEffect, useState } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";

// components
import Nav from "../../components/Nav/Nav";
import ItemCard from "../../components/ItemCard/ItemCard"
import SummaryItemCard from "../../components/SummaryItemCard/SummaryItemCard";
import AddItemForm from "../../components/AddItemForm/AddItemForm";

// styling
import "./CollectionDetailPage.css";

// Swiper
import Swiper, { Autoplay } from 'swiper';
import { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.min.css';


//////////////////////////// helpers and set up ////////////////////////////

// format date for display
function formatDate(string) {
   var options = { year: "numeric", month: "long", day: "numeric" };
   return new Date(string).toLocaleDateString([], options);
}


//////////////////////////// main component ////////////////////////////
function CollectionDetailPage() {

   /////////////// variables

   // Collection id (from url) and history
   const history = useHistory();
   const { id } = useParams();

   // Loading and Modal States
   const [isLoading, setIsLoading] = useState(true);
   const [modalState, setModalState] = useState(false);
   const [summaryModal, setSummaryModal] = useState(false)

   // Error
   const [hasError, setHasError] = useState(false);
   const [errorMessage, setErrorMessage] = useState();

   // Data state variables
   const [collectionData, setCollectionData] = useState({ collection_items: [] });
   const [itemData, setItemData] = useState([]);
   const [itemDisplayData, setItemDisplayData] = useState([])

   // swiper
   Swiper.use([Navigation, Pagination, Controller, Thumbs]);
   const swiper = useRef(null)

   // ordering and filtering state variables
   const [filterChoice, setFilterChoice] = useState("all")
   const [orderChoice, setOrderChoice] = useState("default")

   // summary variables:
   const [summaryChoice, setSummaryChoice] = useState("")
   const [summaryInfo, setSummaryInformation] = useState([])
   const [summaryTitle, setSummaryTitle] = useState("Price")

   // Public or private path (shared collection or own collection)
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

   // let response
   let key_information
   /////////////// methods

   // Get collection and associated items' data
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
      } catch (thisError) {
         console.log("---------------thisError: ", thisError)
         setIsLoading(false);
         setErrorMessage(thisError);
         setHasError(true);
         return
      }

      const data = await response.json();

      if (response.ok) {
         setCollectionData(data);
         setItemData(data.collection_items);
         setItemDisplayData(data.collection_items)
         setIsLoading(false);

      } else {
         setHasError(true);
         setErrorMessage(data.detail);
         console.log("-------------DATA: ", data.detail)
         setIsLoading(false);

         // Here is a list of the errors I have gotten
         // Not logged on
         // data.detail = "Invalid token."

         // Logged in with different account
         // data.detail = "You do not have permission to perform this action."

         // Collection doesn't exist
         // data.detail = "Not found."
         setIsLoading(false);
      }

   }

   useEffect(() => {
      fetchProjects()
   }, []);

   useEffect(() => {
      fetchProjects()
   }, [id]);


   // Modal state change functions
   const addItemToggleModalState = () => {
      setModalState(!modalState);
      window.scrollTo(0, 0);
   };

   const summaryToggleState = () => {
      setSummaryModal(!summaryModal);
      window.scrollTo(0, 0);
   };


   // Delete Item
   const handleDelete = (projectdat, e) => {
      console.log("------------handleDelete")

      fetch(`${process.env.REACT_APP_API_URL}item/${projectdat.id}/`, {
         method: "delete",
         headers: {
            Authorization: `Token ${token}`,
         },
      })
      .then((response) => {

         if (response.ok) {
            //history.push(`/collection/${id}/`)
            //window.location.reload();
         } else {
            console.log(response)
            setHasError(true)
            setErrorMessage(response.statusText);
         }
      });
   }

   // Archive Item
   const archiveItem = (item, e) => {
      let token = window.localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_API_URL}item/${item.id}/archive/`, {
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

   // FILTER active-archived-all items  
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


   // ORDER items by price, date 
   let sorted

   useEffect(() => {

      if (orderChoice === "price-lh") {

         sorted = [...itemData].sort((a, b) => a.price - b.price)
         //see explanation at the end of this file to understand this a bit more
         setItemData(sorted)
         //console.log("price-lh ordering")

      } else if (orderChoice === "price-hl") {

         sorted = [...itemData].sort((a, b) => a.price - b.price).reverse()
         setItemData(sorted)
         //console.log("price-hl ordering")

      } else if (orderChoice === "date-created") {

         sorted = [...itemData].sort((a, b) => a.id - b.id)
         setItemData(sorted)
         //console.log("date-created ordering")

      } else if (orderChoice === "alphabetical") {

         sorted = [...itemData].sort((a, b) => a.name > b.name ? 1 : -1)
         setItemData(sorted)
         //console.log("alphabetical ordering")

      } else if (orderChoice === "default") {

         // sorted = [...itemData].sort((a, b) => a.last_updated - b.last_updated )
         setItemData(collectionData.collection_items)
         //console.log("default ordering")

      } else if (orderChoice === "date-modified") {

         sorted = [...itemData].sort((a, b) => new Date(a.last_updated) - new Date(b.last_updated))
         setItemData(sorted)
         // console.log("date-modified ordering")

      } else {

         console.log("Error in ordering. Order chosen doesn't match any of the order options. orderChoice = ", orderChoice)

      }

   }, [orderChoice])



   // Swiper
   useEffect(() => {

      swiper.current = new Swiper('.swiper-container', {
         // observer: true,
         loop: true,
         effect: 'coverflow',
         // grabCursor: false,
         simulateTouch: true,
         // slidesOffsetAfter: 20,
         // centeredSlides: true,
         // centeredSlidesBounds: true,
         watchOverflow: true,
         slidesPerView: 1,
         spaceBetween: 10,
         breakpoints: {
            '@0.75': {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            '@1.00': {
               slidesPerView: 3,
               spaceBetween: 40,
            },
            '@1.50': {
               slidesPerView: 4,
               spaceBetween: 50,
            }
         },
         coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
         },
         pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
         },
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         }
      })

   }, [itemDisplayData, id])


   // SUMMARY choices
   useEffect(() => {

      if (summaryChoice === "price") {

         key_information = itemDisplayData.map(function (item, index) {
            return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.price };
         })
         setSummaryInformation(key_information)
         setSummaryTitle("Price")
         console.log(key_information)

      } else if (summaryChoice === "sale_amount") {

         key_information = itemDisplayData.map(function (item, index) {
            return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.sale_amount, end_date: item.sale_end_date };
         })
         setSummaryInformation(key_information)
         setSummaryTitle("Discount")
         console.log(key_information)


      } else if (summaryChoice === "attribute1") {

         key_information = itemDisplayData.map(function (item, index) {
            return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.attribute1 };
         })
         setSummaryInformation(key_information)
         setSummaryTitle(collectionData.attribute1)
         console.log(key_information)

      } else if (summaryChoice === "attribute2") {

         key_information = itemDisplayData.map(function (item, index) {
            return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.attribute2 };
         })
         setSummaryInformation(key_information)
         setSummaryTitle(collectionData.attribute2)
         console.log(key_information)

      } else if (summaryChoice === "attribute3") {

         key_information = itemDisplayData.map(function (item, index) {
            return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.attribute3 };
         })
         setSummaryInformation(key_information)
         setSummaryTitle(collectionData.attribute3)

         console.log(key_information)

      } else if (summaryChoice === "attribute4") {

         key_information = itemDisplayData.map(function (item, index) {
            return { key: index, title: item.name, is_active: item.is_active, image: item.image, value: item.attribute4 };
         })
         setSummaryInformation(key_information)
         setSummaryTitle(collectionData.attribute4)
         console.log(key_information)

      } else {

         console.log("Error in summaryChoice. summaryChoice chosen doesn't match any of the attributes, attribute = ", summaryChoice)

      }

   }, [summaryChoice])



   /////////////// return
   return (
      <div>
         <div>
            <Nav />
         </div>
         <div id="projectlistcenter">

            {/* No longer loading, there IS an error message */}
            {!isLoading && hasError && (<div>
               <div id="errormessage">
                  <br></br>
                  <img className="backgroundimage" alt="Error!" src="https://www.pngitem.com/pimgs/m/119-1190787_warning-alert-attention-search-error-icon-hd-png.png" />
                  <h2>{errorMessage}</h2>
               </div>
            </div>)}

            {/* No longer loading, there is NO error message */}
            {!isLoading && !hasError && (
               <div>
                  <div id="App">

                     {/* collection information */}
                     <div id="SwiperInfoContainer" >

                        {shared_link === "private" ? (
                           <div>
                              {/* top text with the number of items in a collection */}
                              { itemDisplayData.length > 0 ? (<p>You are currently comparing {itemDisplayData.length} items in the {collectionData.title} list </p>) : (<p>You are yet to add any items to {collectionData.title}!</p>)}

                              {/* button to change order of items - go to a different url */}
                              <Link to={{ pathname: `/collection/${id}/manual-sort/`, state: { itemsProps: itemData } }}><button >Change Default Order</button></Link>
                           </div>

                        ) : (<div>
                           { itemDisplayData.length > 0 ? (<p>There are currently {itemDisplayData.length} items in the {collectionData.title} list for comparison. </p>) : (<p>There are no items added to list {collectionData.title}!</p>)}
                        </div>)}

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
                           <button className="" onClick={() => summaryToggleState()}>GO</button>
                        </div>
                     </div>
                     <div id="store-filter-button-container" >
                        <div id="Container-for-Filtering" >

                           {/* first drop down - filter choices */}
                           <select onChange={(e) => setFilterChoice(e.target.value)}>
                              <option value="all">All items</option>
                              <option value="active">Active items</option>
                              <option value="archived">Archived items</option>
                           </select>

                           {/* second drop down - order choices */}
                           <select onChange={(e) => setOrderChoice(e.target.value)}>
                              <option value="default">Default</option>
                              <option value="alphabetical">Alphabetical order</option>
                              <option value="price-lh">Price - low to high</option>
                              <option value="price-hl">Price - high to low</option>
                              <option value="date-created">Date created</option>
                              <option value="date-modified">Date modified</option>
                           </select>
                        </div>
                        {collectionData.is_active ? (<button className="" onClick={() => addItemToggleModalState()}>Add Item</button>
                        ) : ("")}
                     </div>
                     <div id="project-list">
                        <div className="swiperMainContainer" style={modalState || summaryModal ? { pointerEvents: "none", opacity: "0.4" } : {}} >

                           {/* Swiper container */}
                           <div className="swiper-container">
                              <div className="swiper-wrapper">
                                 {itemDisplayData != null && itemDisplayData.length > 0 ? itemDisplayData.map((el, key) => {
                                    return (
                                       <div className="swiper-slide" key={key}>
                                          <ItemCard key={key} projectData={el} collectionData={collectionData} />
                                          {shared_link === "private" && (
                                             <div className="buttoncontainer">
                                                <Link to={`/item-edit/${el.id}/${collectionData.id}/`}>
                                                   <button className="" >Edit </button >
                                                </Link>
                                                <a><button className="" onClick={() => archiveItem(el)}>{el.is_active ? "Archive" : "Unarchive"}</button></a>
                                                <a><button className="" onClick={() => handleDelete(el)}>Delete </button></a>
                                             </div>
                                          )}
                                       </div>
                                    )
                                 }) : null}
                              </div>

                              {/* -- If we need pagination -- */}
                              <div className="swiper-pagination"></div>
                           </div>
                        </div>
                     </div>
                  </div>

         {/* Modal for AddItemForm */}
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

         {/* Modal for Summaries */}
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

            {/* Is still loading (fetching the data) */}
            {isLoading && (
               <div>
                  <div>Is Loading</div>
                  {/* <Loader /> */}
               </div>
            )}

         </div >
      </div>
   )
}


export default CollectionDetailPage;




