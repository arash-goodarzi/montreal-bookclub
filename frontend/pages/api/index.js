export default function handler(req, res) {
    res.status(200).json(
        [
            {
            id:1000,
            title: 'first title',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donators: ['donator-name'],
            available: true,
            bookImage:"/booksImage/1.jpg"
            },
            {
            id:1001,
            title: 'second title',
            writers: ['writer-name'],
            translators: ['translator-name'],
            donators: ['donator-name'],
            available: true,
            bookImage:"/booksImage/2.jpg"
            },
        ]
    )
    
}