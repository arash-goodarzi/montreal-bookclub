export default function handler(req, res) {
    
    if (req.method === 'GET') {
        fetch('http://localhost:8080/api/books')
        .then(response => response.json())
        .then(data => console.dir(data))
        .then(data => res.status(200).json(data))
            // .catch(console.log("fffffffffffffff"))
////////////////////////////////////////////////////
        
        // res.status(200).json(
        // [
        //     {
        //     id:1000,
        //     title: 'zoro',
        //     writers: ['orod'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name1','donator-name2','donator-name3','donator-name4','donator-name5'],
        //     reserved: true,
        //     bookImage:"/booksImage/1.jpg"
        //     },
        //     {
        //     id:1001,
        //     title: 'moro',
        //     writers: ['garsia'],
        //     translators: ['translator-name'],
        //     donors: ['mahsa','Edd'],
        //     reserved: true,
        //     bookImage:"/booksImage/2.jpg"
        //     },
        //     {
        //     id:1002,
        //     title: 'first title',
        //     writers: ['tita','tuba'],
        //     translators: ['translator-name'],
        //     donors: ['TeD,fRank'],
        //     reserved: true,
        //     bookImage:"/booksImage/1.jpg"
        //     },
        //     {
        //     id:1003,
        //     title: 'aba',
        //     writers: ['mouse','bird'],
        //     translators: ['translator-name'],
        //     donors: ['Suzi','Lee'],
        //     reserved: false,
        //     bookImage:"/booksImage/2.jpg"
        //     },
        //     {
        //     id:1004,
        //     title: 'baba',
        //     writers: ['writer-name'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name'],
        //     reserved: true,
        //     bookImage:"/booksImage/1.jpg"
        //     },
        //     {
        //     id:1005,
        //     title: 'abcd',
        //     writers: ['writer-name'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name'],
        //     reserved: true,
        //     bookImage:"/booksImage/2.jpg"
        //     },
        //     {
        //     id:1006,
        //     title: 'kafkA',
        //     writers: ['writer-name'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name'],
        //     reserved: false,
        //     bookImage:"/booksImage/1.jpg"
        //     },
        //     {
        //     id:1007,
        //     title: 'second title',
        //     writers: ['writer-name'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name'],
        //     reserved: true,
        //     bookImage:"/booksImage/2.jpg"
        //     },
        //     {
        //     id:1008,
        //     title: 'first title',
        //     writers: ['writer-name'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name'],
        //     reserved: true,
        //     bookImage:"/booksImage/1.jpg"
        //     },
        //     {
        //     id:1009,
        //     title: 'second title',
        //     writers: ['writer-name'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name'],
        //     reserved: true,
        //     bookImage:"/booksImage/2.jpg"
        //     },
        //     {
        //     id:1010,
        //     title: 'first title',
        //     writers: ['writer-name'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name'],
        //     reserved: true,
        //     bookImage:"/booksImage/1.jpg"
        //     },
        //     {
        //     id:1011,
        //     title: 'second title',
        //     writers: ['writer-name'],
        //     translators: ['translator-name'],
        //     donors: ['donator-name'],
        //     reserved: false,
        //     bookImage:"/booksImage/2.jpg"
        //     },
        // ]
        // )
    } else if (req.method === 'POST') {
        const reserved = req.body.reserved
        const email = req.body.email
        const newReservation = {
            id: Date.now(),
            reservedId: reserved, 
            usename: email,
            user: {
                "id":"",
                "username": email             
            }
        }
        const user = {
            "id":"",
            "username": email             
        }

        console.log("api: ", newReservation)
        console.log("api: ", `http://localhost:8080/api/book/reserve/${reserved}`)
        console.log("user: ", user)
        

        fetch(`http://localhost:8080/api/book/reserve/${reserved}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                    "id":"",
                    "username": email             

            }),            
        })
        .then(response => response.json())
        .then(data => console.dir(data))
        .then(data => res.status(200).json(data))


    }
}