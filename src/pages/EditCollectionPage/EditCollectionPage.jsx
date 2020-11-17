import EditCollectionForm from "../../components/EditCollectionForm/EditCollectionForm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function EditCollectionPage() {
    const { id, listid } = useParams();
    const [editData, setEditData] = useState({})
    //const [collectionData, setCollectionData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    let token = localStorage.token;


    useEffect(() => {
        console.log('ppp')
        fetch(`${process.env.REACT_APP_API_URL}collection/${id}/`, {
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
                setEditData(data);
                setIsLoading(false);
            })
    }, [id]);


    if (isLoading) {

        return (
            <div className="loadingpage">
                <img alt="" src={"https://i.imgur.com/3BOX1wi.gif"} />
            </div>
        )

        // if the credentials match and there are collections to show
    } else {

        return (

            <div>

                {token !== null && (
                    <div>


                        <EditCollectionForm collectionData={editData} />
                    </div>
                )}


            </div>
        );
    }
}

export default EditCollectionPage;
