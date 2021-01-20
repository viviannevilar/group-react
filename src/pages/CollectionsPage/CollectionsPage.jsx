import React, { useState, useEffect, useRef } from "react"
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

    let btnRefShare = useRef();

    // This variable will store the error code from the request
    const [errorCode, setErrorCode] = useState();

    const [errorMessage, setErrorMessage] = useState();

    // Modal
    const [modalState, setModalState] = useState(false);
    const [username, setUsername] = useState("")
    const [id, setId] = useState()
    const [collectionName, setCollectionName] = useState()

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

      console.log(signedPK)
      if (signedPK) {
        setId(signedPK.split("/")[0])
      }

    }, [signedPK])

  

    function copyLink() {
      navigator.clipboard.writeText(linkText).then(function() {
         alert("URL copied to clipboard")
      })
    }

    const handleChange = (e) => {
      const { id, value } = e.target;
      setUsername((prevUsername) => ({
         ...prevUsername,
         [id]: value,
      }));
      console.log(username)
   };


  // Add username to allowed users
  const shareCollection = async () => {
  //   e.preventDefault();
  let token = window.localStorage.getItem("token");



  const response = await fetch(`${process.env.REACT_APP_API_URL}collection/${id}/add_user/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(username),
  });

    // // this enables the submit button again
    if (btnRefShare.current) {
      btnRefShare.current.disabled = false
      }

  if (response.ok) {
    console.log(response.status)
    setErrorMessage(response.status)

    return response.json();
  } else {
    response.text().then(text => {
      throw Error(text)
    }).catch(
      (error) => {

        console.log(error.message)

    // const errorObj = JSON.parse(error.message);
    // console.log(errorObj)


      }
    )
  }



};
    
    

    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log("handlesubmit")
      // console.log(credentials);



      if (!username.username || !username.username.trim().length) {
        setErrorMessage("please enter a valid username")
      } else {
        //disables the button to submit form until there is a response
        if (btnRefShare.current) {
          btnRefShare.current.disabled = true
        }
        shareCollection().then((response) => {
          setErrorMessage(response.status)
        });

      }
   };


    

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
                                    return <CollectionCard key={key} collectionData={collectionData} toggleModal={shareToggleModalState} setSignedPK={setSignedPK} setCollectionName={setCollectionName} />;
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
                            <h1>Share {collectionName}</h1>
                            {/* <SummaryItemCard summary_choice={summaryTitle} summary_info={summaryInfo} /> */}

                            <p className="mb-2">Anyone with this link will be able to view this collection:</p>

                            <div className="box-link">
                              <p>{linkText}</p>
                              <div onClick={copyLink} >
                              <FaRegClipboard className="fa-icon"/>
                              </div>
                            </div>
                            <br></br>
                            <br></br>

                            <p className="mb-2">Or you can give editing rights to an existing user:</p>
                            
                           
                              
                            <form className="share-form">
                              <label htmlFor="username">
                                  username:
                              </label>
                              <input
                                  type="text"
                                  id="username"
                                  onChange={handleChange}
                              />
                              <button className="btn-share" type="submit" ref={btnRefShare} onClick={handleSubmit}>
                                Share
                              </button>
                            </form>
                            <p><span className="error">{ errorMessage ? errorMessage : null}</span></p>

                            <br></br>

                            <div>
                                <button className="btn-share" onClick={() => shareToggleModalState()}> exit </button>
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
