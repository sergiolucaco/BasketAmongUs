## BasketAmongUs 

#### **INTRODUCTION**

This is my final project in SkyLab Coders Academy during a full-stack web development bootcamp in Barcelona.

The very first aim of this project is to create an application which helps to find playable b-courts to play basketball with friends or just people who love this sport and just want to have a good time.

#### **CURRENT FUNCIONALITIES**
 
    * Allow us to search basketball courts around your geolocalization (distance in km).
    * Filter that search by category of court ( outside/indoors ).
    * Create new courts just by dragging your marker and filling an easy form.
    * Possibility to isolate just one court by accessing to its detailview.    

#### **INCOMING FUNCIONALITIES**
 
    * Login and signup system.
    * Possibility to edit one court created by yourself.
    * Possibility to add comments in the detail view of every court.
    * Possibility to add photos of the b-meetups.
    * Room chats in every court.
    * Calendar implementation.    

#### **TOPICS**

- **Endpoints Of the API** using data from a **MongoDb collection** to retrieve data or perform actions(Note: Currently everybody can add their favorite b-court if there hasn't created yet) :

    + `GET` `/api/courts` : get all the courts listed in DB.
    + `POST` `/api/courts` : update DB with new courts.
    + `POST` `/api/courts/filtered` : filter with different parameters(distance and tipology : covered / uncovered)
        
    + `GET` `/court/:id`  : get court by ID

- **Angular App** using this data to display the info to the user
    + **controllers**
    + **services**
    + **views**

- **Google Maps**
    + Display the map (ngMap package) : `ng-map`
    + Display coordinates as markers in the map : `marker`
    + Fit the map to markers : `bounds`
    + Draggable marker which shows your geolocalitation and capture event and new coordinates : `draggable: true`

- `bower` to manage client dependencies
- `npm` to manage server dependencies


#### **Technologies used**

To structure this application web, as a MEAN project, it will be used some technologies:
    
    In the FrontEnd side :
        * HTML 5
        * CSS 3
        * Bootstrap (Bootstrap UI Angular Incoming..)
        * Angular Js ( also NgMap, ngGeolocation )
                
    And in the BackEnd side: 
        * Node Js
        * Express
        * MongoDB
        * Mongoose
        * JWT ( incoming )
        * AWS S3( incoming ) 
    
    App online version :
        * mLab ( to achieve db online)
        * Heroku 

This is the current software that I used. However, all this content is sensitive to be changed because it is in current developing.

Last Updated : 02/12
