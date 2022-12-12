# CarCar

Team:

- Melissa Michaud - Services
- Joe Lock - Sales

## Design

## Shared functionality

- Shared the functionality of front end inventory forms and lists. Utilized functional based components for all forms/ lists.
- App.js includes all the routes and Nav.js was edited so theres separate dropdown functions in the Nav bar for sales, service, and inventory.

## Service microservice

- **_Service API_**: RESTful API to handle automobile service appointments.
- **_Service Poller_**: Poller to poll the **Inventory API** for manufacturer, vehiclemodel and automobile.
- **Django**: Backend models, views, urls. Views have complete CRUD functions for service appointments and technicians. Settings was edited to ensure Django app and project are linked, and added CORS permissions.
- **Inventory** **API**: Provides **Manufacturer**, **VehicleModel** and **Automobile** RESTful API endpoints.
- **Database**: PostgreSQL database that holds the data of all microservices.
- **React**: React-based front-end application to interact with services.

- Class components were utilized to create Service appointments, list service appointments, list service history, and create a technician.

## Sales microservice

- **_Sales API_**: RESTful API to handle automobile sales
- **_Sales Poller_**: Poller to poll the Inventory API to get the automobiles and append the automobileVO
- **DJANGO**: Beackend models, views and urls. Views with completed CRUD functions but not all added to front-end.

- All forms and lists created in react with functional components



Explain your models and integration with the inventory
microservice, here.
