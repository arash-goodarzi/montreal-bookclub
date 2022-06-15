export default function handler(req, res) {
    
    if (req.method === 'GET') {
        // fetch('http://localhost:8080/api/books')
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .then(data => res.status(200).json(data))
        //     .catch(console.log("fffffffffffffff"))
////////////////////////////////////////////////////
        
        res.status(200).json(
        [
            {
            id:1000,
            title: 'zoro',
            writers: ['orod'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: true,
            bookImage:"/booksImage/1.jpg"
            },
            {
            id:1001,
            title: 'moro',
            writers: ['garsia'],
            translators: ['translator-name'],
            donors: ['mahsa,Edd'],
            reserved: true,
            bookImage:"/booksImage/2.jpg"
            },
            {
            id:1002,
            title: 'first title',
            writers: ['tita,tuba'],
            translators: ['translator-name'],
            donors: ['TeD,fRank'],
            reserved: true,
            bookImage:"/booksImage/1.jpg"
            },
            {
            id:1003,
            title: 'aba',
            writers: ['mouse,bird'],
            translators: ['translator-name'],
            donors: ['Suzi,Lee'],
            reserved: true,
            bookImage:"/booksImage/2.jpg"
            },
            {
            id:1004,
            title: 'baba',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: true,
            bookImage:"/booksImage/1.jpg"
            },
            {
            id:1005,
            title: 'abcd',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: true,
            bookImage:"/booksImage/2.jpg"
            },
            {
            id:1006,
            title: 'kafkA',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: false,
            bookImage:"/booksImage/1.jpg"
            },
            {
            id:1007,
            title: 'second title',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: true,
            bookImage:"/booksImage/2.jpg"
            },
            {
            id:1008,
            title: 'first title',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: true,
            bookImage:"/booksImage/1.jpg"
            },
            {
            id:1009,
            title: 'second title',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: true,
            bookImage:"/booksImage/2.jpg"
            },
            {
            id:1010,
            title: 'first title',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: true,
            bookImage:"/booksImage/1.jpg"
            },
            {
            id:1011,
            title: 'second title',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donors: ['donator-name'],
            reserved: false,
            bookImage:"/booksImage/2.jpg"
            },
        ]
        )
    } else if (req.method === 'POST') {
        const reserved = req.body.reserved
        const newReservation = {
            id: Date.now(),
            reservedId: reserved, 
        }
        console.log("api: ",newReservation)
    }
}