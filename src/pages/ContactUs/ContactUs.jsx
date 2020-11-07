import React from "react";
import ContactUsForm from "../../components/ContactUsForm/ContactUsForm";
import Nav from "../../components/Nav/Nav";

function ContactUsPage(){

    return (
        <div id="Nav">
        <div>
            <Nav />
        </div>
      <div>
        <ContactUsForm />
      </div>
      </div>
    );
  }

export default ContactUsPage;