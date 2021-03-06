import React, {Component} from 'react';

class API extends Component {
    static login(user) {
        return new Promise(
            (resolve, reject) => {
                fetch("/login", {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                }).then(
                    (res) => {
                        resolve(res.json())
                    }
                )
            }
        );
    }

    static signup(user) {
        return new Promise(
            (resolve, reject) => {
                fetch("/signup", {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                }).then(
                    (res) => {
                        resolve(res.json())
                    }
                )
            }
        );
    }

    static coins(from, to) {
        return new Promise(
            (resolve, reject) => {
                var data={from_id:from, to_id:to};
                fetch("/coins", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                }).then(
                    (res) => {
                        res.json().then(
                            (body)=>{
                                resolve(body.message)
                            }
                        )
                    }
                ).catch(
                    (err)=>{
                        reject(err);
                    }

                )
            }
        );
    }

    static search(search) {
        return new Promise(
            (resolve, reject) => {
                fetch("/search", {
                    method: "POST",
                    body: JSON.stringify(search),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                }).then(
                    (res) => {
                        resolve(res.json())
                    }
                )
            }
        );
    }

    static subscribe(who, what) {
        return new Promise(
            (resolve, reject) => {
                let data = {user_id: who, coin_id: what};

                fetch("/subscribe", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                }).then(
                    (res) => {
                        res.json().then(
                            (body)=>{
                                if(body.status==200){
                                    resolve(body.message);
                                }else{
                                    reject(body.message);

                                }

                            }
                        )
                    }
                )
            }
        );
    }

    static unsubscribe(who, what) {
        return new Promise(
            (resolve, reject) => {
                let data = {user_id: who, coin_id: what};

                fetch("/unsubscribe", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                }).then(
                    (res) => {
                        res.json().then(
                            (body)=>{
                                if(body.status==200){
                                    resolve(body.message);
                                }else{
                                    reject(body.message);

                                }

                            }
                        )
                    }
                )
            }
        );
    }

    static message(message) {
       var object={message:message}

        return new Promise(
            (resolve, reject) => {
                fetch("/message", {
                    method: "POST",
                    body: JSON.stringify(object),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                }).then(
                    (res) => {
                        res.json().then(
                            (body)=>{
                                if(body.status==200){
                                    resolve(body.message);
                                }else{
                                    reject(body.message);

                                }

                            }
                        )
                    }
                )
            }
        );
    };

    static rmmessage(message) {
        var object={id:message}
        return new Promise(
            (resolve, reject) => {
                fetch("/rmmessage", {
                    method: "POST",
                    body: JSON.stringify(object),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                }).then(
                    (res) => {
                        resolve(res.json())
                    }
                )
            }
        );
    }
}

export {API}


