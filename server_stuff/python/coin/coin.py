import requests
import json

class Coin:
    def listAll(self):
        r = requests.get('https://api.coinmarketcap.com/v2/listings/')
        return r.json()
    
    
    def getSome(self, start_at):
        url = 'https://api.coinmarketcap.com/v2/ticker/?start=' + str(start_at) + "&sort=id"
        r = requests.get(url)
        return r.json()
    

    