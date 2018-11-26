//from: https://blog.manifold.co/building-a-chat-room-in-30-minutes-using-redis-socket-io-and-express-9e8e5a578675

"use strict";


import { client } from "../lib/redis";

export let lookupSocket = (io, id)=>{
    return new Promise(
        (resolve,reject)=>{
            client().then(
                client=>{
                    let socket_id = client.get("user." + id + ".socket");
                    resolve(socket_id);
                }
            ).catch(
                (err)=>{
                    reject(err)
                }
            )
        }
    );
}

export let userLogin = (pwd, user_name)=>{
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


export let userSignup = (pwd, user_name)=>{
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
export let getCoins = (from, to)=>{
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

export let subscribeCoin = (coin_id) => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {

                resolve()
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
}

export let unsubscribeCoin = (coin_id)=>{
    return new Promise(
        (resolve,reject)=>{
            client().then(
                client=>{

                    resolve();
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
                 client.publish("user."+msg.to_id, msg.msg);
                 client.lpush("user."+msg.to_id+".inbox", JSON.stringify(msg));
                 resolve();
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
              length = client.llen("user."+message.to_id+".inbox")
              let msg = {};

              for(let x = 0; x<length; ++x){
                  msg = JSON.parse(client.lpop("user."+message.to_id+".inbox"))
                  if(msg.id === message.id){
                      resolve();
                      break;
                  } else {
                      client.rpush(JSON.stringify(msg))
                  }
                  if(x===length){
                      reject("message not found");
                  }
              }
          }
      )
   })
};




export let fetchMessages = () => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res.lrangeAsync("messages", 0, -1).then(
                    messages => {
                        resolve(messages);
                    },
                    err => {
                        reject(err);
                    }
                );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};

export let addMessage = message => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res
                    .multi()
                    .rpush("messages", message)
                    .execAsync()
                    .then(
                        res => {
                            resolve(res);
                        },
                        err => {
                            reject(err);
                        }
                    );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};

export let fetchActiveUsers = () => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res.smembersAsync("users").then(
                    users => {
                        resolve(users);
                    },
                    err => {
                        reject(err);
                    }
                );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};

export let addActiveUser = user => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res
                    .multi()
                    .sadd("users", user)
                    .execAsync()
                    .then(
                        res => {
                            if (res[0] === 1) {
                                resolve("User added");
                            }

                            reject("User already in list");
                        },
                        err => {
                            reject(err);
                        }
                    );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};

export let removeActiveUser = user => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res
                    .multi()
                    .srem("users", user)
                    .execAsync()
                    .then(
                        res => {
                            if (res === 1) {
                                resolve("User removed");
                            }
                            reject("User is not in list");
                        },
                        err => {
                            reject(err);
                        }
                    );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};
