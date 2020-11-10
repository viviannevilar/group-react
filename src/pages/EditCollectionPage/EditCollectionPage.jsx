import EditCollectionForm from "../../components/EditCollecitonForm/EditCollectionForm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function EditCollectionPage() {
    const { id, listid } = useParams();
    const [editData, setEditData] = useState({})
    const [collectionData, setCollectionData] = useState({})
    let token = localStorage.token;

    useEffect(() => {

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
                console.log(data)
                setEditData(data);
            })
    }, [id]);


    return (

        <div>
            {token !== null && (
                <div>
                    <EditCollectionForm CollecitonData={editData}/>
                </div>
            )}


        </div>
    );
}

export default EditCollectionPage;
