import React from "react";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";



function EditProfilePage() {
  return (
     <div className="page-wrapper">
         {/* <Nav /> */}
         
         <EditProfileForm />

         {/* <Footer /> */}
     </div>
  )
}

export default EditProfilePage;