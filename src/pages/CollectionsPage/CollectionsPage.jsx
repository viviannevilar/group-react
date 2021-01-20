import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import CollectionCard from "../../components/CollectionCard/CollectionCard"
import "./CollectionsPage.css";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import addicon from "../../images/add.png"
import archiveicon from "../../images/archive.png"
import activeicon from "../../images/activeicon.png"
import "../../components/CollectionCard/CollectionCard.css"
// import Nav from "../../components/Nav/Nav";
// import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import logoicon from "../../images/Comparalist_rectangle.png"

// icons
import { FaRegClipboard  } from 'react-icons/fa';

function CollectionsPage() {

    //////////////////////////// variables ////////////////////////////

    // this checks the url (/collections/ or /collections-archive/)
    const location = useLocation()

    const [activePath, setActivePath] = useState("active-collections/")

    const [collectionsList, setCollectionsList] = useState([]);

    const [isLoading, setIsLoading] = useState(true)

    const [signedPK, setSignedPK] = useState()

    const [linkText, setLinkText] = useState()

    // This variable will store the error code from the request
    const [errorCode, setErrorCode] = useState();

    // Modal
    const [modalState, setModalState] = useState(false);

    // const [summaryModal, setSummaryModal] = useState(false)


    //////////////////////////// methods ////////////////////////////

    // the page shows different things depending on whether the path is collections or archived-collections. 
    // this function checks the pathname and sets the state with the path
    // when the location (url) changes, the value of activePath is updated
    useEffect(() => {

        if (location.pathname === "/collections/") {
            setActivePath("active-collections/")
        } else {
            setActivePath("archived-collections/")
        }

    }, [location]);

    // fetch the data (archived or active, depending on the value of activePath)
    useEffect(() => {

        let token = window.localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}${activePath}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
            .then((results) => {
                setErrorCode(results.status)
                return results.json();
            })
            .then((data) => {
                setCollectionsList(data);
                setIsLoading(false)
            })
    }, [activePath]);

    // Modal state change functions
    const shareToggleModalState = () => {
      setModalState(!modalState);
      window.scrollTo(0, 0);
    };

    useEffect(() => {
      setLinkText("https://comparalist.herokuapp.com/collection/" + signedPK + "/")
      console.log("linkText useEffect ----> ", linkText)
    }, [signedPK])

  

    function copyLink() {

      console.log("linkText ----> copyLink", linkText)

      // const linkText = "https://comparalist.herokuapp.com/collection/shared/" + signedPK + "/"

      navigator.clipboard.writeText(linkText).then(function() {
         alert("URL copied to clipboard")
      })
      
    //   alert("Share this collection with others - your collection URL was copied to your clipboard!")

    }


    //////////////////////////// return ////////////////////////////

    // while it is fetching the data show .gif
    if (isLoading) {

        return <Loader />

        // if not found (project doesn't exist) 
    } else if (errorCode === 404) {

        return (

            <ErrorComponent errorMessage="Collection not found!" errorNumber="404" />

        )
        // if not logged in or wrong credentials
    } else if ((errorCode === 401) || (errorCode === 403)) {

        return (
            <ErrorComponent errorMessage="You don't have permission to see this page!" errorNumber="401" />
        )

        // if there are no collections to show
    } else {

        return (
            <div className="page-wrapper">
                {/* <div id="CollectionNav">
                    <Nav />
                </div> */}
                <div >

                    <div >
                        <div className="collectionsheadertitle">
                            <h1>{(activePath === "active-collections/") ? "Collections" : "Archived Collections"} </h1>
                        </div>
                        <div className="cpbuttoncontainer">
                            {/* button to see archived collections or active collections */}
                            {(activePath === "archived-collections/") ?

                                <Link className="addcollectioncontainer" to={`/collections/`}>
                                    <img style={{ cursor: "pointer" }} className="changeicons" alt="activeicon" src={activeicon} />
                                    <p style={{ cursor: "pointer" }} > See Active Collections</p>
                                </Link>
                                :
                                <Link className="addcollectioncontainer" to={`/collections-archive/`}>
                                    <img style={{ cursor: "pointer" }} className="changeicons" alt="archiveicon" src={archiveicon} />
                                    <p style={{ cursor: "pointer" }} > See Archived Collections</p>
                                </Link>}

                            <Link className="addcollectioncontainer" to={`/newcollection/`}>
                                <img style={{ cursor: "pointer" }} className="changeicons" alt="addicon" src={addicon} />
                                <p style={{ cursor: "pointer" }} > Create Collection</p>
                            </Link>

                        </div>
                        {/* display list of collections */}
                        {collectionsList.length > 0
                            ? (<div className="box-wrap">
                                {collectionsList.map((collectionData, key) => {
                                    return <CollectionCard key={key} collectionData={collectionData} toggleModal={shareToggleModalState} setSignedPK={setSignedPK} />;
                                })}
                            </div>)

                            : (<div className="nodatacontainer">
                                {/* <img className="nodatalogo" alt="nodatalogo" src={logoicon} /> */}
                                <p id="no-data">You have no {location.pathname === "/collections/" ? "active" : "archived"} collections</p>
                            </div>)}

                    </div>

                    {/* Modal for Sharing */}
                    <div className={`modalBackground modalShowing-${modalState}`}>
                      <div className="modalInner">
                          <div className="modalText">
                            <h2>Share this collection</h2>
                            {/* <SummaryItemCard summary_choice={summaryTitle} summary_info={summaryInfo} /> */}

                            <div className="box-link">
                              <p>{linkText}</p>
                              <div onClick={copyLink} >
                              <FaRegClipboard className="fa-icon"/>
                              </div>
                            </div>


                            <div>
                                <button className="exitButton" onClick={() => shareToggleModalState()}> exit </button>
                            </div>
                          </div>
                      </div>
                    </div>

                    {/* <Footer /> */}
                </div>
            </div>
        )
    }

}

export default CollectionsPage;
