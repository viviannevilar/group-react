import React from "react";
import EditProfileForm from "./pages/EditProfileForm/EditProfileForm";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";



function EditProfilePage() {
   
  return (
     <div>
         <Nav />
         
         <EditProfileForm />

         <Footer />
     </div>
  )
}

export default EditProfilePage;