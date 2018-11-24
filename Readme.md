#Peter Davis Interview for GoUbiq


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
