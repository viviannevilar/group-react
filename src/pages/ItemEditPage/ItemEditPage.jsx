import ItemEditForm from "../../components/ItemEditForm/ItemEditForm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function ItemEditPage() {
    const { id, listid } = useParams();
    const [editData, setEditData] = useState({})
    const [collectionData, setCollectionData] = useState({})
    const [isLoading, setIsLoading] = useState(true);


    let token = localStorage.token;

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}item/${id}/`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
            .then((results) => {
               if (!results.ok) {

                  console.log("***", results.statusText)
                  console.log("***", results.json())
               } else {
                  setIsLoading(false)
                  return results.json();
               }
               console.log("--------RESULTS fetch data", results)
                
            })
            .then((data) => {
                console.log(data)
                setEditData(data);

            })
    }, [id]);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}collection/simple/${listid}/`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                console.log(data)
                setCollectionData(data);
            })
    }, [listid]);




    return (
        <div className="page-wrapper">

            {token !== null && (
                  <ItemEditForm itemData={editData} collectionData={collectionData} isLoading={isLoading}/>
            )}

        </div>
    );
}

export default ItemEditPage;