import requests
import json

class Coin:
    def listAll():
        r = requests.get('https://api.coinmarketcap.com/v2/listings/')
        return r.json()
    
    
    def getSome(self, start_at: int = 1):
        url = 'https://api.coinmarketcap.com/v2/ticker/?start=' + str(start_at) + "&sort=id"
        r = requests.get(url)
        return r.json()
    

    