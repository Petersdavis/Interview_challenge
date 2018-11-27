#Peter Davis Interview for GoUbiq

####################################
####  Installation
####################################
1) Run /server_stuff/node/npm install 
2) Run /server_stuff/docker-compose up
3) Run /react_app/npm install
4) Run /react_app/npm run start
 

####################################
####  UI Features
####################################

1. Pages (Login, Dashboard)
2. Components (
    i) Listview
        -lazyloaded
    ii) SearchBar
    iii) ChatBox
    iv) Alerts

####################################
#### Server Side Features
####################################

1. Websockets
    -Each Client Gets a Connection
    -Messages are sent over the connection
        {   
            code:"0"
            msg:"",
            from:{
                id:##
                name:""
            }
        }
    -Coins are sent over the connection if the user is subscribed
        {
            code:"1"
            id:##
            price:##
            timestamp:###
        } 
    -New/Canceled subscriptions to coins are sent over the connection if the user is subscribed
        {
            code:"2"
            id:##
            name:""
        }  
        
2.Rest API
    User Access:
    -Create User 
    -Login
    -Token Login
    
    Coins:
    Get Coin ##-##
    Get Coin Array [##, ##, ##]
        
    Message
    Send Message
    
    
    
2. Database for coin prices
3. Database for messages
4. CoinMarketCap API
    API Limit 30 / minute
    Endpoints update every 5 minutes
    We will set coin data for a chunk to be fresh for 15 minutes
    If a visible or subscribed coin expires on a client machine the machine will request new data    
    

5. Google Sign-in 

####################################
#### Server->Client Communications
####################################

1. Coin Update
2. New Message
3. New Subscriber 

####################################
#### Client->Server Communications
####################################

1. Get All Coins
2. Open Socket
3. Get unread messages
4. Get subscribers to coin
