import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"

function ServiceAppointmentList() {

    const [services, setServices] = useState([]);
    const fetchServices  = async () => {
        const url = 'http://localhost:8080/api/services/'
        const response = await fetch(url);
        const servicesData = await response.json();
        console.log(servicesData);
        setServices(servicesData.services);
    }

    const[automobiles, setAutomobiles] = useState([]);
    const fetchAutomobiles = async () => {
        const response = await fetch(url)
        const automobilesData = await response.json()
        setAutomobiles(automobilesData.autos)
    }

    useEffect(() => {
        fetchServices();
        fetchAutomobiles();
    }, []);

    const cancelItem = async (id) => {
        await fetch(`http://localhost:8080/api/services/${id}/`,{
            method = 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_cancelled:true}),
    }).then(() => {
        window.
    })
    }

}








export default ServiceAppointmentList;
