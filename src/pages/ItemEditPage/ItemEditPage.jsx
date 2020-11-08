import ItemEditForm from "../../components/ItemEditForm/ItemEditForm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";


function ItemEditPage() {
    const { id, listid } = useParams();
    const [editData, setEditData] = useState({})
    const [collectionData, setCollectionData] = useState({})
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
                return results.json();
            })
            .then((data) => {
                console.log(data)
                setEditData(data);
            })
    }, [id]);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}collection/${listid}/`, {
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
        <div id="Nav">
        <div>
            <Nav />
        </div>
        <div>
            {token !== null && (
                <div>
                    <ItemEditForm itemData={editData} collectionData={collectionData} />
                </div>
            )}


        </div>
        </div>
    );
}

export default ItemEditPage;