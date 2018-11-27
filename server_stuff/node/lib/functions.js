//from: https://blog.manifold.co/building-a-chat-room-in-30-minutes-using-redis-socket-io-and-express-9e8e5a578675
"use strict";
var passwordHash = require('password-hash');

import { client } from "../lib/redis";

export let test = ()=>{
    return new Promise(
        (resolve,reject)=>{
          resolve(saveMessage({to_id:1, from_id:0, msg:"HELLO WORLD"}))
        }
    );
}

export let getMsgId = (id, client)=>{
    return new Promise(
        (resolve,reject)=>{
           client.get("message."+id, (err, string)=>{
               resolve(JSON.parse(string));
           })
        }
    )

}

export let getMsgArray=(ids, client)=>{
    return new Promise(
        (resolve,reject)=>{
            var promises = [];
            ids.forEach(
                (id)=>{
                    promises.push(getMsgId(id, client))
                }
            )
            Promise.all(promises).then(
                (values)=>{
                    resolve(values);
                }
            )
        }
    )
}


export let userLogin = (pwd, user_name)=>{
    return new Promise(
        (resolve,reject)=>{
            client().then(
                client=>{
                    client.get("user." + user_name, (err, id) =>{
                        if(id === null){
                            reject("USER_DNE")
                        } else {
                            client.get("user."+id+".password", (err, hash) => {
                                // reply is null when the key is missing
                                if(!passwordHash.verify(pwd, hash)){
                                    reject("BAD_CRED");
                                } else {
                                    var user = {};
                                    user.name = user_name;
                                    user.id = id;
                                    client.smembers("user."+id+".inbox", function(err, messages) {
                                        // reply is null when the key is missing
                                          getMsgArray(messages, client).then(
                                            (messages)=>{
                                                user.messages = messages;

                                                client.smembers("user."+id+".subs", function(err, subs) {
                                                    user.subs = subs;
                                                    resolve(user);
                                                })
                                            }
                                        );
                                    });
                                }
                            });
                        }
                    })
                }
            ).catch(
                (err)=>{
                    reject(err)
                }
            )
        }
    );
}


export let userSignup = (pwd, user_name)=>{
    return new Promise(
        (resolve,reject)=>{
            client().then(
                client=>{
                    client.exists("user." + user_name, (err, exists) =>{

                        if(exists){
                            reject("USER_EXISTS")
                        } else {
                            client.incr("user_count", (err, reply) => {
                                // reply is null when the key is missing
                                let id = reply;
                                let hash = passwordHash.generate(pwd);
                                client.set("user." + user_name, id)
                                client.set("user." + id + ".password", hash);
                                resolve({name: user_name, id: id});

                            });
                        }
                    })
                }
            ).catch(
                (err)=>{
                    reject(err)
                }
            )
        }
    );
}
export let getCoin = (id, client)=>{
    return new Promise(
        (resolve)=> {
           client.get("coin." + id + ".json", (err, coin)=>{
               resolve(coin);
           })
        }
    )
}

export let getCoins = (from, to)=>{
    return new Promise(
        (resolve,reject)=>{
            client().then(
                client=>{
                    var promises = []
                    for(;from <= to;++from){
                      promises.push( getCoin(from, client))
                    }
                    Promise.all(promises).then(
                        (values)=>{
                            resolve(values)
                        }
                    ).catch(
                        (err)=>{
                            reject(err)
                        }
                    )
                }
            ).catch(
                (err)=>{
                    reject(err)
                }
            )
        }
    );
}

/*** TODO: ***/
export let searchCoin = (from, to)=>{
    return new Promise(
        (resolve,reject)=>{
            client().then(
                client=>{
                }
            ).catch(
                (err)=>{
                    reject(err)
                }
            )
        }
    );
}

export let subscribeCoin = (user_id, coin_id) => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                client.sadd("user."+user_id +".subs", coin_id, (err, result)=>{
                    if(result==0){
                        reject("Subscription Already Exists");
                    } else {
                        client.publish("coin."+coin_id+".subs", "ADD:" + user_id);
                        resolve()
                    }
                })
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
}

export let unsubscribeCoin = (user_id, coin_id)=>{
    return new Promise(
        (resolve,reject)=>{
            client().then(
                client=>{
                    client.srem("user."+user_id +".subs", coin_id, (err, result)=>{
                        if(result==0){
                            reject("Subscription Did Not Exists");
                        } else {
                            client.publish("coin."+coin_id+".subs", "RM:" + user_id);
                            resolve()
                        }
                    })
                }
            ).catch(
                (err)=>{
                    reject(err)
                }
            )
        }
    );
};


export let saveMessage = (message)=>{
    return new Promise(
        (resolve,reject)=>{
            client().then(
             client=>{
                 client.incr("message_count", (err, id)=>{
                     message.id = id;
                     var message_string = JSON.stringify(message);
                     client.set("message." + id, message_string )
                     client.publish("user."+message.to_id, message_string);
                     client.sadd("user."+message.to_id+".inbox", id);
                     resolve();
                 })
             }
            ).catch(
                (err)=>{
                    reject(err)
                }
            )
        }
    );
};

export let deleteMessage = (message) => {
   return new Promise((resolve, reject)=>{
      client().then(
          client=>{
              client.srem("user." + message.to_id + ".inbox", message.id)
              resolve();
          }
      ).catch(err=>{
          reject(err)
      })
   })
};

