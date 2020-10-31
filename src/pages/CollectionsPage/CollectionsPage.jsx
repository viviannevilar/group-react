import React​, { useState, useEffect }​ from "react";
import "./HomePage.css"


function CollectionsPage() {

    ​const [collectionsList, setCollectionsList] = useState([]);

    // This variable will have the error code from the request
    const [errorCode, setErrorCode] = useState();

    useEffect(() => {
        let token = window.localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}collections/`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
        .then((results) =>  {
            setErrorCode(results.status)

            return results.json();
        })
        .then((data) => {
            setCollectionsList(data);
        })
    }, []);


    function Collections() {

        if (!items || items.length === 0) {
            return "Be the first one to donate to this project!";
          } else {
              
            return items.map((item, key) => {
                  return (
                      <div key={key} className="collection-wrapper">
                          <p> {item.title}</p>
                          <p> {item.date_created} </p>
                      </div>
                  )
            });
          }
    }


    return (
        <div id="collections-list">
            <div className="wrapper">

                {Collections()}

            </div>
        </div>
    ); 
}

export default CollectionsPage;



