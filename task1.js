const axios = require('axios');

const users = [1,4,5, 6, 7, 8, 9, 10]

const url = 'https://jsonplaceholder.typicode.com/users'

async function getUsers(users) {
 
    try{

        const bres = [];
        for(let i=0; i<users.length; i+=5){
            const batch = users.slice(i, i+5)
            const res = await Promise.race([ 
                Promise.all(
                    batch.map(user => 
                        axios.get(`${url}/${user}`).then(res => res.data)
                    )
                ),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 2000))
            ])
            bres.push(...res)
            console.log('выполн batch', batch.length)
        }
        


        return bres;

    }catch(error){
        console.log(error)
        return null;
    }
}


getUsers(users).then(res => {
    if(res){
        console.log(res)
    }
})