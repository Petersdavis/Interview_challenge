import redis

class redisClient:
    redis_host = "goubiq_redis"
    redis_port = 6379
    redis_password = ""
    def __init__(self):
        try:
            self.redis_instance = redis.Redis(host=self.redis_host, port=6379, db=0)
        except Exception as e:
            self.redis_instance = None
            print(e)
    
    def incr(self, key):
       return self.redis_instance.incr(key)
   
    def keyExists(self, key):
        self.redis_instance.exists(key)
                
    def setValue(self, key, value):
        self.redis_instance.set(key, value)
        
    def SetAdd(self, key, value):
        self.redis_instance.sadd(key, value)
        
    def getValue(self, key):
        return self.redis_instance.get(key)
    
    def publish(self, channel, value):
        self.redis_instance.publish(channel, value)    
        
    def hello_world(self):
        self.redis_instance.set("msg:hello", "Hello Redis!!!")
        msg = self.redis_instance.get("msg:hello")
        print(msg)
