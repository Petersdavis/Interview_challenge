import requests
import json

exec(open("./coin/coin.py").read())

"""
r = requests.get('https://api.coinmarketcap.com/v2/listings/')
print(r)
r = r.json()
print(r['data'][0])
"""

api = Coin()
json = api.getSome(55)
print(json)
