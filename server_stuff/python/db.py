import mysql.connector

class db_conn:
    def getConn():
        cnx = mysql.connector.connect(user='scott', password='123',
                                      host='goubiq',
                                      database='goubiq')
        return cnx

    def closeConn(cnx):
        cnx.close()


    def addCoins(coins):
        cnx = self.getConn()
        cursor = cnx.cursor()
        add_coin = ("REPLACE INTO coin "
           "(id, symbol, timestamp, name, rank, supply, price, volume)"
           "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")
        cursor.execute(add_coin, coins);
        cnx.commit()
        self.closeConn(cnx)
        


