from time import gmtime, strftime, sleep
import httplib2
import requests
import json

exec(open("./coin/coin.py").read())
exec(open("./redisClient/redisClient.py").read())


h = httplib2.Http()
start_at = 0

api = Coin()
all_coins = api.listAll()
print("SERVER STARTED")


conn = redisClient()
coin_count = all_coins["metadata"]["num_cryptocurrencies"]
conn.setValue("coin_count", coin_count )
    
print("Seen "+ str(coin_count) + " coins!")


while True:

    coins = api.getSome(start_at)
    for index in coins["data"]:
        x=coins["data"][index]
        if(conn.keyExists("coin."+str(x["id"])+".timestamp")):
            last_update = conn.getValue("coin."+str(x["id"])+".timestamp")
            id = conn.getValue("coin.name."+x["name"])
        else:
            id = conn.incr("coin_id_tracker")
            conn.setValue("coin.name."+x["name"], id)
            last_update = 0
        
        if(last_update != x["last_updated"]):        
            formated_data = {}
            formated_data['id'] = id
            formated_data['name'] = x["name"]
            formated_data['symbol'] = x["symbol"]
            formated_data['rank'] = x["rank"]
            formated_data['supply'] = x["total_supply"]
            formated_data['price'] = x["quotes"]["USD"]["price"]
            formated_data['volume'] = x["quotes"]["USD"]["volume_24h"]
            formated_data['market'] = x["quotes"]["USD"]["market_cap"]
            formated_data['timestamp'] = x["last_updated"]
            conn.setValue("coin."+str(id)+".json", json.dumps(formated_data))
            conn.setValue("coin."+str(id)+".timestamp", x["last_updated"])
            conn.publish("coin."+str(id), json.dumps(formated_data))            

    if(start_at + 100 < coin_count):
        start_at += 100
    else:
        start_at = 0
    print("Fetched some coins going to sleep:")
  
    print("PING")
    sleep(120)
    