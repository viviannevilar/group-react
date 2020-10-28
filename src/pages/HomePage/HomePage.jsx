import React, { useState, useEffect } from "react"
//import { allProjects } from "../data"
import ProjectCard from "../components/ProjectCard/ProjectCard"
import "./HomePage.css"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

function HomePage() {
    //variables
    const [projectList, setProjectList] = useState([]);

    //methods
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/`)
            .then((results) =>  {
                return results.json();
            })
            .then((data) => {
                setProjectList(data);
            })
        //setProjectList(allProjects);
    }, []);

    //template
    return (
        <div className="outer-container">

            <div id="showcase">

            <div className="container">
            <AliceCarousel autoPlay autoPlayInterval="3000">
                <img alt="" src={"https://i.imgur.com/dwkOhts.jpg"} className="sliderimg"/>
                <img alt="" src={"https://i.imgur.com/cZEW86k.jpg"} className="sliderimg"/>
                <img alt="" src={"https://i.imgur.com/J7l9nka.jpg"} className="sliderimg"/>
                <img alt="" src={"https://i.imgur.com/UfzChBu.jpg"} className="sliderimg"/>
            </AliceCarousel>
            </div>
            <div className="text-superimpose">
                <h1 className="centered"><span className="text-primary">Empowering </span>Women</h1>

                </div>
            </div>

            {/* </div> */}

            <div className="wrapper">
                <div className="project-list">
                    {projectList.map((projectData,key) => {
                        return <ProjectCard key={key} projectData={projectData} image={projectData.image} showdrafts={false}/>;
                    })}
                </div>
            </div>
        </div>
    )
}



export default HomePage