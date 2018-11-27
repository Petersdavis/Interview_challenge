from time import gmtime, strftime, sleep
import httplib2
import requests
import json

exec(open("./coin/coin.py").read())
exec(open("./redisClient/redisClient.py").read())


h = httplib2.Http()
"""
This application should poll the coinAPI every 60 seconds for 100 coins;
From the data it should know the most determine coin count

If Max coins are greater than the latest index + 100 => set the index back to 0

The coins need to be stored in a mysql db.
They will also be published to redis database in the format channel:coin-id

"""
start_at = 0

api = Coin()
all_coins = api.listAll()

conn = redisClient()
coin_count = all_coins["metadata"]["num_cryptocurrencies"]
conn.setValue("coin_count", coin_count )
for x in all_coins["data"]:
    conn.setValue("coin.name."+x["name"], x["id"])
print("Seen "+ str(coin_count) + " coins!")
while True:
    coins = api.getSome(start_at)
    for index in coins["data"]:
        x=coins["data"][index]
        last_update = conn.getValue("coin."+str(x["id"])+".timestamp")
        if(last_update != x["last_updated"]):        
            formated_data = {}
            formated_data['id'] = x["id"]
            formated_data['name'] = x["name"]
            formated_data['symbol'] = x["symbol"]
            formated_data['rank'] = x["rank"]
            formated_data['supply'] = x["total_supply"]
            formated_data['price'] = x["quotes"]["USD"]["price"]
            formated_data['volume'] = x["quotes"]["USD"]["volume_24h"]
            formated_data['market'] = x["quotes"]["USD"]["market_cap"]
            formated_data['timestamp'] = x["last_updated"]
            conn.setValue("coin."+str(x["id"])+".timestamp", x["last_updated"])
            conn.publish("coin."+str(x["id"]), json.dumps(formated_data))

    if(start_at + 100 < coin_count):
        start_at += 100
    else:
        start_at = 0
    print("Fetched some coins going to sleep:")
    sleep(60)
    