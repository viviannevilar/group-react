
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "../../components/Nav/Nav.css";
import ContactUsPage from "../../pages/ContactUs/ContactUs";

function EditCollectionForm(props) {


    const { collectionData } = props;

    console.log(collectionData)
    //variables
    const [credentials, setCredentials] = useState({
        id: null,
        title: "",
        attribute1: "",
        attribute2: "",
        attribute3: "",
        attribute4: "",
        is_active: true,
    });

    useEffect(() => {

        setCredentials({
            id: parseInt(collectionData.id),
            title: collectionData.title,
            attribute1: collectionData.attribute1,
            attribute2: collectionData.attribute2,
            attribute3: collectionData.attribute3,
            attribute4: collectionData.attribute4,
            is_active: collectionData.is_active,
        });
    }, [collectionData]);


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

        let form_data = new FormData();
        form_data.append('attribute1', credentials.attribute1);
        form_data.append('attribute2', credentials.attribute2);
        form_data.append('attribute3', credentials.attribute3);
        form_data.append('attribute4', credentials.attribute4);    
        form_data.append('is_active', credentials.is_active);
        form_data.append('title', credentials.title);

        //function you can call but carry on as well
        const response = await fetch(`${process.env.REACT_APP_API_URL}collection/${collectionData.id}/`, {
            method: "put",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: form_data,
            // body: JSON.stringify(credentials),
        });
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handlesubmit")
        console.log(credentials);
        postData().then((response) => {
            console.log(response)
            history.push(`/collection/${collectionData.id}/`);
            // window.location.reload();
        });

    };



    return (
        <div id="Nav">
            <div>
                <Nav />
            </div>
    
        <div id="pledgeform">

            <h2 id="headerTitle"> Edit {collectionData.title} </h2>
            <form>

                <div className="thra">
                    <label htmlFor="title">Name of Collection:</label>
                    <input
                        type="text"
                        id="title"
                        value={credentials.title}
                        onChange={handleChange}
                    />
                </div>

                {collectionData.attribute1 !== "" && (<div className="thra">
                    <label htmlFor="attribute1">Attribute 1:</label>
                    <input
                        type="text"
                        id="attribute1"
                        value={credentials.attribute1}
                        onChange={handleChange}
                    />
                </div>)}



                {collectionData.attribute2 !== "" && (<div className="thra">
                    <label htmlFor="attribute2">Attribute 2:</label>
                    <input
                        type="text"
                        id="attribute2"
                        value={credentials.attribute2}
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute3 !== "" && (<div className="thra">
                    <label htmlFor="attribute3">Attribute 3:</label>
                    <input
                        type="text"
                        id="attribute3"
                        value={credentials.attribute3}
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute4 !== "" && (<div className="thra">
                    <label htmlFor="attribute4">Attribute 4:</label>
                    <input
                        type="text"
                        id="attribute4"
                        value={credentials.attribute4}
                        onChange={handleChange}
                    />
                </div>)}



                <div className="thra">
                    <label htmlFor="is_open">Would you like to archive this Collection and come back to it later?</label>

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
                    <button className="pledgebutton" type="submit" onClick={handleSubmit}>  Update Collection </button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default EditCollectionForm;
