import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function AddItemForm(props) {
    const { id, collectionData } = props;

    //variables
    const [credentials, setCredentials] = useState({
        name: "",
        attribute1: "",
        attribute2: "",
        attribute3: "",
        attribute4: "",
        image: "",
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

    const handleImageChange = (e) => {
        e.persist();

        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            image: e.target.files[0],
        }));
    };

    const history = useHistory();

    const postData = async () => {
        let token = window.localStorage.getItem("token");

        //function you can call but carry on as well

        let form_data = new FormData();
        form_data.append('image', credentials.image);
        form_data.append('attribute1', credentials.attribute1);
        form_data.append('attribute2', credentials.attribute2);
        form_data.append('attribute3', credentials.attribute3);
        form_data.append('attribute4', credentials.attribute4);
        form_data.append('collection', credentials.collection);       
        form_data.append('is_active', credentials.is_active);
        form_data.append('name', credentials.name);

        const response = await fetch(`${process.env.REACT_APP_API_URL}items/`, {
            method: "post",
            headers: {
                Authorization: `Token ${token}`,
            },
            body: form_data,
        });
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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

                {collectionData.attribute1 !== "" && (<div className="formattribute">
                    <label htmlFor="attribute1">{collectionData.attribute1}:</label>
                    <input
                        type="text"
                        id="attribute1"
                        onChange={handleChange}
                    />
                </div>)}



                {collectionData.attribute2 !== "" && (<div className="formattribute">
                    <label htmlFor="attribute2">{collectionData.attribute2}:</label>
                    <input
                        type="text"
                        id="attribute2"
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute3 !== "" && (<div className="formattribute">
                    <label htmlFor="attribute3">{collectionData.attribute3}:</label>
                    <input
                        type="text"
                        id="attribute3"
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute4 !== "" && (<div className="formattribute">
                    <label htmlFor="attribute4">{collectionData.attribute4}:</label>
                    <input
                        type="text"
                        id="attribute4"
                        onChange={handleChange}
                    />
                </div>)}


                <div className="formattribute">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
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
