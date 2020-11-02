import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function EditItemForm(props) {


    const { itemData, collectionData } = props;

    //variables
    const [credentials, setCredentials] = useState({
        id: null,
        name: "",
        attribute1: "",
        attribute2: "",
        attribute3: "",
        attribute4: "",
        attribute5: "",
        image: null,
        collection: null,
        is_active: true,
    });

    useEffect(() => {
        console.log(itemData)


        setCredentials({
            id: parseInt(itemData.id),
            name: itemData.name,
            attribute1: itemData.attribute1,
            attribute2: itemData.attribute2,
            attribute3: itemData.attribute3,
            attribute4: itemData.attribute4,
            attribute5: itemData.attribute5,
            image: itemData.image,
            is_active: itemData.is_active,
            collection: parseInt(collectionData.id),
        });
        console.log(credentials)

    }, [itemData]);


    //methods
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const history = useHistory();

    const postData = async () => {
        let token = window.localStorage.getItem("token");

        //function you can call but carry on as well
        const response = await fetch(`${process.env.REACT_APP_API_URL}item/${itemData.id}/`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(credentials);
        postData().then((response) => {
            console.log(response)
            history.push(`/collection/${collectionData.id}/`);
        });

    };


    const handleBack = (e) => {
        history.push(`/collection/${collectionData.id}/`);
    };

    return (
        <div id="pledgeform">
            <h2 id="headerTitle"> Edit Item in {collectionData.title} </h2>
            <form>

                <div className="thra">
                    <label htmlFor="name">Name of Item:</label>
                    <input
                        type="text"
                        id="name"
                        value={itemData.name}
                        onChange={handleChange}
                    />
                </div>

                {collectionData.attribute1 != "" && (<div className="thra">
                    <label htmlFor="attribute1">{collectionData.attribute1}:</label>
                    <input
                        type="text"
                        id="attribute1"
                        value={itemData.attribute1}
                        onChange={handleChange}
                    />
                </div>)}



                {collectionData.attribute2 != "" && (<div className="thra">
                    <label htmlFor="attribute2">{collectionData.attribute2}:</label>
                    <input
                        type="text"
                        id="attribute2"
                        value={itemData.attribute2}
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute3 != "" && (<div className="thra">
                    <label htmlFor="attribute3">{collectionData.attribute3}:</label>
                    <input
                        type="text"
                        id="attribute3"
                        value={itemData.attribute3}
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute4 != "" && (<div className="thra">
                    <label htmlFor="attribute4">{collectionData.attribute4}:</label>
                    <input
                        type="text"
                        id="attribute4"
                        value={itemData.attribute4}
                        onChange={handleChange}
                    />
                </div>)}


                {collectionData.attribute5 != "" && (<div className="thra">
                    <label htmlFor="attribute5">{collectionData.attribute5}:</label>
                    <input
                        type="text"
                        id="attribute5"
                        value={itemData.attribute5}
                        onChange={handleChange}
                    />
                </div>)}

                <div className="thra">
                    <label htmlFor="image">Image:</label>
                    <br></br>
                    <div id="imagecon">
                        <img id="profilepicture" src={itemData.image} alt="anon pic" />
                    </div>
                    <br></br>
                    <input
                        type="file"
                        id="image"
                        onChange={handleChange}
                    />
                </div>


                <div className="thra">
                    <label htmlFor="notes">Notes:</label>
                    <input
                        type="textarea"
                        id="notes"
                        value={itemData.notes}
                        onChange={handleChange}
                    />
                </div>

                <div className="thra">
                    <label htmlFor="is_open">Would you like to archive this item in the list and come back to it later?</label>

                </div>

                <div className="radiowrapper">
                    <input
                        type="radio"
                        id="is_active"
                        name="is_active"
                        onChange={handleChange}
                    />
                    <label htmlFor="is_active">Active</label>

                    <input
                        type="radio"
                        id="is_active"
                        name="is_active"
                        value="false"
                        onChange={handleChange}
                    />
                    <label htmlFor="false">Archive</label>
                </div>


                <div className="buttonwrapper">
                    <button className="pledgebutton" type="submit" onClick={handleSubmit}>  Edit List Item </button>
                </div>
            </form>
        </div>
    );
}

export default EditItemForm;
