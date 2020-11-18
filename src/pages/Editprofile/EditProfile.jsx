import React from "react";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
// import Nav from "../../components/Nav/Nav";
// import Footer from "../../components/Footer/Footer";



function EditProfilePage() {
   let username = localStorage.username;
   console.log(username )

   console.log("--------------------------------------------")


  return (
     <div className="page-wrapper">
         {/* <Nav /> */}
         
         {username === null ? 
         <ErrorComponent errorMessage="You are not logged in!" errorNumber="403" /> 
         : <EditProfileForm />}
        

         {/* <Footer /> */}
     </div>
  )
}

export default EditProfilePage;