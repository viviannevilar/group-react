import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function AddItemForm(props) {
    const { id, collectionData } = props;

    //variables
    const [credentials, setCredentials] = useState({
        name: "",
        attribute1: "",
        attribute2: "",
        attribute3: "",
        attribute4: "",
        attribute5: "",
        image: null,
        collection: parseInt(id),
        is_active: true,
    });


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
        const response = await fetch(`${process.env.REACT_APP_API_URL}items/`, {
            method: "post",
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
            history.push(`/collection/${id}/`);
            window.location.reload();
        });

    };

    return (
        <div>
            <h2 id="headerTitle"> Add Item to {collectionData.title} </h2>
            <form>

                <div className="formattribute">
                    <label htmlFor="name">Name of Item:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                    />
                </div>

                {collectionData.attribute1 != "" && (<div className="formattribute">
                    <label htmlFor="attribute1">{collectionData.attribute1}:</label>
                    <input
                        type="text"
                        id="attribute1"
                        onChange={handleChange}
                    />
                </div>)}



                {collectionData.attribute2 != "" && (<div className="formattribute">
                    <label htmlFor="attribute2">{collectionData.attribute2}:</label>
                    <input
                        type="text"
                        id="attribute2"
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute3 != "" && (<div className="formattribute">
                    <label htmlFor="attribute3">{collectionData.attribute3}:</label>
                    <input
                        type="text"
                        id="attribute3"
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute4 != "" && (<div className="formattribute">
                    <label htmlFor="attribute4">{collectionData.attribute4}:</label>
                    <input
                        type="text"
                        id="attribute4"
                        onChange={handleChange}
                    />
                </div>)}


                {collectionData.attribute5 != "" && (<div className="formattribute">
                    <label htmlFor="attribute5">{collectionData.attribute5}:</label>
                    <input
                        type="text"
                        id="attribute5"
                        onChange={handleChange}
                    />
                </div>)}

                <div className="formattribute">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleChange}
                    />
                </div>


                <div className="formattribute">
                    <label htmlFor="notes">Notes:</label>
                    <input
                        type="textarea"
                        id="notes"
                        onChange={handleChange}
                    />
                </div>


                <div className="buttonwrapper">
                    <button type="submit" onClick={handleSubmit}>  Add to List </button>
                </div>
            </form>
        </div>
    );
}

export default AddItemForm;
