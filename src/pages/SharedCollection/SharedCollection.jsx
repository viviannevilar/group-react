import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"



function SharedCollection() {

    const { id, code } = useParams()

    const [collectionData, setCollectionData] = useState([]);

    const [isLoading, setIsLoading] = useState(true)

    const [errorCode, setErrorCode] = useState();


    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}collection/safe/${id}/${code}/`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((results) =>  {
            setErrorCode(results.status)
            return results.json();
        })
        .then((data) => {
            console.log(data)
            setCollectionData(data);
            setIsLoading(false)
        })
        
     }, [id]);

    
    if (isLoading) {
        return (
            <div>
                <img alt="" src={"https://i.imgur.com/3BOX1wi.gif"}/>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Shared Collection</h1>
                <p>Collection ID: {collectionData.id}</p>
                <p>Collection title: {collectionData.title}</p>
                <p>Collection owner: {collectionData.user}</p>
            </div>
        )

    }


}


export default SharedCollection