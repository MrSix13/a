import bcrypt from 'bcryptjs';


const data ={
    users:[
        {
            name: 'Bastian',
            email: 'admin@mail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'Usuario 2',
            email: 'user@mail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        },
    ],
    products:[
        {

            name: 'Call of duty: Black ops 3',
            slug: 'Call-of-duty:-Black-ops-3',
            category:'Shooter',
            image:'images/p1.jpg',
            price: 60,
            countInStock: 10,
            brand: 'Treyarch',
            rating: 5,
            numReviews:10,
            description: 'Shooter Multiplayer'
        
        },
        {

            name: 'Call of duty: Modern Warfare',
            slug: 'Call-of-duty:-Modern-Warfare',
            category:'Shooter',
            image:'images/p2.jpg',
            price: 60,
            countInStock: 10,
            brand: 'Treyarch',
            rating: 4.5,
            numReviews:10,
            description: 'Shooter Multiplayer'
        
        },
        {
            name: 'Call of duty: Word War 2',
            slug: 'Call-of-duty:-WW2',
            category:'Shooter',
            image:'images/p3.jpg',
            price: 60,
            countInStock: 0,
            brand: 'Treyarch',
            rating: 4.5,
            numReviews:10,
            description: 'Shooter Multiplayer'
        
        }
    ]
}

export default data;