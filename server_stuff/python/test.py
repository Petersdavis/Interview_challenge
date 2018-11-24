import requests

r = requests.get('https://api.coinmarketcap.com/v2/listings/')
print(r)
r = r.json()
print(r)