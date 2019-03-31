#Peter Davis Interview for GoUbiq

####################################
####  Installation
####################################
1) Run /server_stuff/node/npm install 
2) Run /server_stuff/docker-compose up
3) Run /react_app/npm install
4) Run /react_app/npm run start
 

####################################
#### Architecture
####################################

        
1.Docker-compose includes 3 servers
  PYTHON ===>  Redis  <===> Node.js  <====>  React.js
                                      -Http 
                                      -Sockets 
                                      -RestApi 
    
    a) Python
    Python is used to poll the coin API at a regular interval.
    Python container stores data about coins in a Redis database and publishes any updates to coins.
    
    b) Redis is used as a message broker, and as a fast persistant storage for coins and users.
    
    c) Node.js server handles serving static files, socket connections, and a Rest Api
    
    d) React to render UI and manage application state
    

####################################
#### Accomplishments
####################################

1)  It gets and stores coin data from CoinMarketCap API
2)  Implemented a lazy loading coin fetcher 
3)  Most views render well at all screen resolutions (some strings are a little long).
4)  Implemented a search bar so that user can filter results.  With lazy loader it is a slow hacky way to search all coins. 
5)  The user can subscribe to specific coins updates
6)  The user receives notifications of updates to these coins immediately
7)  When someone subscribes to a coin, everyone else who is already subscribed to it also
    get notified about the subscriber (new subscriber joined message);
8)  A user subscribed to a coin can send direct message to other users subscribed to that coin.
9)  A system is in place to store offline messages (but it still needs debugging something wrong with redis .sadd() and .smembers() method) 


####################################
#### Shortcomings
#################################### 
 
 1) Got carried away on the UI
 2) Did not use test driven development methodology
 3) Did not implement google sign-in
 4) Did not implement message hints based on most messaged users
 5) Did not implement UI to communicate changes in coin prices
 
 

####################################
#### Challenges
#################################### 
 
 1) Really live data is challenging when API is rate limited and returns chunks of 100 sequential coins.
