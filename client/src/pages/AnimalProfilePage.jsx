import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";


const AnimalProfilePage = () => {

    return(
        <div className="animal-profile-page">
            <Link to="/records" className="back-link"><IoMdArrowRoundBack /> back</Link>
            <h1>This animal Profile Page!</h1>
        </div>
    )
}

export default AnimalProfilePage;