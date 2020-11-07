import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function ItemEditForm(props) {


    const { itemData, collectionData } = props;

    //variables

    const [credentials, setCredentials] = useState({
        id: null,
        name: "",
        price: "",
        sale_amount: 0,
        sale_end_date: null,
        sale_amount: "",
        attribute1: "",
        attribute2: "",
        attribute3: "",
        attribute4: "",
        image: "",
        collection: null,
    });


    useEffect(() => {
        console.log(itemData)
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            id: parseInt(itemData.id),
            name: itemData.name,
            sale_amount: itemData.sale_amount,
            sale_end_date: itemData.sale_end_date,
            price: itemData.price,
            attribute1: itemData.attribute1,
            attribute2: itemData.attribute2,
            attribute3: itemData.attribute3,
            attribute4: itemData.attribute4,
            //image: itemData.image,
            collection: parseInt(itemData.collection),
        }));
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
        form_data.append('image', credentials.image);
        form_data.append('attribute1', credentials.attribute1);
        form_data.append('attribute2', credentials.attribute2);
        form_data.append('attribute3', credentials.attribute3);
        form_data.append('attribute4', credentials.attribute4);
        form_data.append('collection', credentials.collection);
        form_data.append('name', credentials.name);
        form_data.append('price', credentials.price);
        form_data.append('sale_amount', credentials.sale_amount);
        form_data.append('sale_end_date', credentials.sale_end_date);


        //function you can call but carry on as well
        const response = await fetch(`${process.env.REACT_APP_API_URL}item/${itemData.id}/`, {
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
        <div id="pledgeform">
            <h2 id="headerTitle"> Edit Item in {collectionData.title} </h2>
            <form>

                <div className="thra">
                    <label htmlFor="name">Name of Item:</label>
                    <input
                        type="text"
                        id="name"
                        value={credentials.name}
                        onChange={handleChange}
                    />
                </div>


                <div className="thra">
                    <label htmlFor="price">Price of Item:</label>
                    <input
                        type="number"
                        id="price"
                        onChange={handleChange}
                        value={credentials.price}

                    />
                </div>


                <div className="thra">
                    <label htmlFor="sale_amount">Is there a discount currently offered (%)?:</label>
                    <input
                        type="number"
                        id="sale_amount"
                        onChange={handleChange}
                        value={credentials.sale_amount}

                    />
                </div>


                {parseInt(credentials.sale_amount) > 0 && (<div className="thra">
                    <label htmlFor="sale_end_date">When does the discount expire?</label>
                    <input
                        type="date"
                        id="sale_end_date"
                        value={credentials.sale_end_date}
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute1 !== "" && (<div className="thra">
                    <label htmlFor="attribute1">{collectionData.attribute1}:</label>
                    <input
                        type="text"
                        id="attribute1"
                        value={credentials.attribute1}
                        onChange={handleChange}
                    />
                </div>)}



                {collectionData.attribute2 !== "" && (<div className="thra">
                    <label htmlFor="attribute2">{collectionData.attribute2}:</label>
                    <input
                        type="text"
                        id="attribute2"
                        value={credentials.attribute2}
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute3 !== "" && (<div className="thra">
                    <label htmlFor="attribute3">{collectionData.attribute3}:</label>
                    <input
                        type="text"
                        id="attribute3"
                        value={credentials.attribute3}
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute4 !== "" && (<div className="thra">
                    <label htmlFor="attribute4">{collectionData.attribute4}:</label>
                    <input
                        type="text"
                        id="attribute4"
                        value={credentials.attribute4}
                        onChange={handleChange}
                    />
                </div>)}



                <div className="thra">
                    <label htmlFor="image">Image:</label>
                    <br></br>
                    <div id="imagecon">
                        <img id="image" src={credentials.image} alt="anon pic" />
                    </div>
                    <br></br>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>


                <div className="thra">
                    <label htmlFor="notes">Notes:</label>
                    <input
                        type="textarea"
                        id="notes"
                        value={credentials.notes}
                        onChange={handleChange}
                    />
                </div>




                <div className="buttonwrapper">
                    <button className="pledgebutton" type="submit" onClick={handleSubmit}>  Update List Item </button>
                </div>
            </form>
        </div>
    );
}

export default ItemEditForm;
