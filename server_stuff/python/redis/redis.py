import redis

class redis:
    redis_host = "goubiq_redis"
    redis_port = 6379
    redis_password = ""
    redis_instance

    def connect(self):
        try:
            self.redis_instance = redis.Redis(host=redis_host, port=6379, db=0)
        except Exception as e:
            print(e)
            
    def setValue(self, key: str = "default", value:str = "" ):
        self.redis_instance.set(key, value)
        
    def getValue(self, key: str = "default"):
        return self.redis_instance.get()
    
    def publish(self, channel:str="coin-1", value:str="ping"):
        self.redis_instance.publish(channel, value)    
        
    def hello_world(self):
        self.redis_instance.set("msg:hello", "Hello Redis!!!")
        msg = self.redis_instance.get("msg:hello")
        print(msg)

if __name__ == '__main__':
    conn = redis()
    conn.connect()
    conn.hello_world()