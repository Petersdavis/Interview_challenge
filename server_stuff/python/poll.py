from time import gmtime, strftime, sleep
import httplib2
import requests

h = httplib2.Http()
"""
This application should poll the coinAPI every 60 seconds for 100 coins;
From the data it should know the most determine coin count

If Max coins are greater than the latest index + 100 => set the index back to 0

The coins need to be stored in a mysql db.
They will also be published to redis database in the format channel:coin-id

"""
start_at = 0


while True:
    (resp, content) = h.request("http://goubiq_node:6400/tic?time=" + strftime("%H:%M:%S", gmtime()))
    sleep(61)
    