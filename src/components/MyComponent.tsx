import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Make sure to use this if you're in a Node environment for generating UUIDs.
import { sha256 } from "js-sha256";

function MyComponent() {

    const users: any[] = [
        {
            id: uuidv4(),
            username: 'destiny',
            password: 'hashedPassword1',
            name: 'Destiny',
            age: 27,
            address: '123 Elm St, Cityville',
            job: 'Teacher',
            hobbies: ['Yoga', 'Reading'],
            email: 'destiny@example.com',
            profileUrl: '/images/Destiny.webp',
            instagram: 'destiny_ig',
            tiktok: 'destiny_tok',
            facebook: 'destiny_fb',
            noTelepon: '081234567890'
        },
        {
            id: uuidv4(),
            username: 'jude',
            password: 'hashedPassword2',
            name: 'Jude',
            age: 25,
            address: '456 Oak St, Townsville',
            job: 'Musician',
            hobbies: ['Playing guitar', 'Gaming'],
            email: 'jude@example.com',
            profileUrl: '/images/Jude.webp',
            instagram: 'jude_ig',
            tiktok: 'jude_tok',
            facebook: 'jude_fb',
            noTelepon: '081234567891'
        },
        {
            id: uuidv4(),
            username: 'andrea',
            password: 'hashedPassword3',
            name: 'Andrea',
            age: 30,
            address: '789 Pine St, Metropolis',
            job: 'Photographer',
            hobbies: ['Photography', 'Traveling'],
            email: 'andrea@example.com',
            profileUrl: '/images/Andrea.webp',
            instagram: 'andrea_ig',
            tiktok: 'andrea_tok',
            facebook: 'andrea_fb',
            noTelepon: '081234567892'
        },
        {
            id: uuidv4(),
            username: 'jade',
            password: 'hashedPassword4',
            name: 'Jade',
            age: 29,
            address: '101 Cedar St, Riverside',
            job: 'Journalist',
            hobbies: ['Writing', 'Yoga'],
            email: 'jade@example.com',
            profileUrl: '/images/Jade.webp',
            instagram: 'jade_ig',
            tiktok: 'jade_tok',
            facebook: 'jade_fb',
            noTelepon: '081234567893'
        },
        {
            id: uuidv4(),
            username: 'oliver',
            password: 'hashedPassword5',
            name: 'Oliver',
            age: 28,
            address: '202 Willow St, Hillside',
            job: 'Engineer',
            hobbies: ['Cycling', 'Hiking'],
            email: 'oliver@example.com',
            profileUrl: '/images/Oliver.webp',
            instagram: 'oliver_ig',
            tiktok: 'oliver_tok',
            facebook: 'oliver_fb',
            noTelepon: '081234567894'
        },
        {
            id: uuidv4(),
            username: 'valentina',
            password: 'hashedPassword6',
            name: 'Valentina',
            age: 32,
            address: '303 Birch St, Lakeside',
            job: 'Doctor',
            hobbies: ['Swimming', 'Traveling'],
            email: 'valentina@example.com',
            profileUrl: '/images/Valentina.webp',
            instagram: 'valentina_ig',
            tiktok: 'valentina_tok',
            facebook: 'valentina_fb',
            noTelepon: '081234567895'
        },
        {
            id: uuidv4(),
            username: 'liliana',
            password: 'hashedPassword7',
            name: 'Liliana',
            age: 26,
            address: '404 Cedar St, Seaside',
            job: 'Artist',
            hobbies: ['Painting', 'Reading'],
            email: 'liliana@example.com',
            profileUrl: '/images/Liliana.webp',
            instagram: 'liliana_ig',
            tiktok: 'liliana_tok',
            facebook: 'liliana_fb',
            noTelepon: '081234567896'
        },
        {
            id: uuidv4(),
            username: 'leah',
            password: 'hashedPassword8',
            name: 'Leah',
            age: 31,
            address: '505 Fir St, Mountainview',
            job: 'Fashion Designer',
            hobbies: ['Sewing', 'Photography'],
            email: 'leah@example.com',
            profileUrl: '/images/Leah.webp',
            instagram: 'leah_ig',
            tiktok: 'leah_tok',
            facebook: 'leah_fb',
            noTelepon: '081234567897'
        },
        {
            id: uuidv4(),
            username: 'ryker',
            password: 'hashedPassword9',
            name: 'Ryker',
            age: 27,
            address: '606 Spruce St, Valleytown',
            job: 'Chef',
            hobbies: ['Cooking', 'Cycling'],
            email: 'ryker@example.com',
            profileUrl: '/images/Ryker.webp',
            instagram: 'ryker_ig',
            tiktok: 'ryker_tok',
            facebook: 'ryker_fb',
            noTelepon: '081234567898'
        },
        {
            id: uuidv4(),
            username: 'easton',
            password: 'hashedPassword10',
            name: 'Easton',
            age: 29,
            address: '707 Aspen St, Rivertown',
            job: 'Architect',
            hobbies: ['Drawing', 'Running'],
            email: 'easton@example.com',
            profileUrl: '/images/Easton.webp',
            instagram: 'easton_ig',
            tiktok: 'easton_tok',
            facebook: 'easton_fb',
            noTelepon: '081234567899'
        },
        {
            id: uuidv4(),
            username: 'alexander',
            password: 'hashedPassword11',
            name: 'Alexander',
            age: 34,
            address: '808 Oakwood St, Greenfield',
            job: 'Software Developer',
            hobbies: ['Coding', 'Hiking'],
            email: 'alexander@example.com',
            profileUrl: '/images/Alexander.webp',
            instagram: 'alexander_ig',
            tiktok: 'alex_tok',
            facebook: 'alex_fb',
            noTelepon: '081234567900'
        },
        {
            id: uuidv4(),
            username: 'riley',
            password: 'hashedPassword12',
            name: 'Riley',
            age: 28,
            address: '909 Pinecrest St, Highlands',
            job: 'Data Analyst',
            hobbies: ['Gaming', 'Gardening'],
            email: 'riley@example.com',
            profileUrl: '/images/Riley.webp',
            instagram: 'riley_ig',
            tiktok: 'riley_tok',
            facebook: 'riley_fb',
            noTelepon: '081234567901'
        },
        {
            id: uuidv4(),
            username: 'christopher',
            password: 'hashedPassword13',
            name: 'Christopher',
            age: 33,
            address: '1010 Maple St, Bayview',
            job: 'Doctor',
            hobbies: ['Reading', 'Running'],
            email: 'christopher@example.com',
            profileUrl: '/images/Christopher.webp',
            instagram: 'christopher_ig',
            tiktok: 'chris_tok',
            facebook: 'chris_fb',
            noTelepon: '081234567902'
        },
        {
            id: uuidv4(),
            username: 'chase',
            password: 'hashedPassword14',
            name: 'Chase',
            age: 26,
            address: '1111 River St, Brookside',
            job: 'Marketing Manager',
            hobbies: ['Swimming', 'Running'],
            email: 'chase@example.com',
            profileUrl: '/images/Chase.webp',
            instagram: 'chase_ig',
            tiktok: 'chase_tok',
            facebook: 'chase_fb',
            noTelepon: '081234567903'
        },
        {
            id: uuidv4(),
            username: 'sadie',
            password: 'hashedPassword15',
            name: 'Sadie',
            age: 24,
            address: '1212 Oak St, Bayside',
            job: 'Graphic Designer',
            hobbies: ['Drawing', 'Dancing'],
            email: 'sadie@example.com',
            profileUrl: '/images/Sadie.webp',
            instagram: 'sadie_ig',
            tiktok: 'sadie_tok',
            facebook: 'sadie_fb',
            noTelepon: '081234567904'
        },
        {
            id: uuidv4(),
            username: 'eliza',
            password: 'hashedPassword16',
            name: 'Eliza',
            age: 29,
            address: '1313 Spruce St, Cliffside',
            job: 'Nurse',
            hobbies: ['Gardening', 'Reading'],
            email: 'eliza@example.com',
            profileUrl: '/images/Eliza.webp',
            instagram: 'eliza_ig',
            tiktok: 'eliza_tok',
            facebook: 'eliza_fb',
            noTelepon: '081234567905'
        },
        {
            id: uuidv4(),
            username: 'kingston',
            password: 'hashedPassword17',
            name: 'Kingston',
            age: 35,
            address: '1414 Birch St, Ridgeview',
            job: 'Financial Analyst',
            hobbies: ['Investing', 'Hiking'],
            email: 'kingston@example.com',
            profileUrl: '/images/Kingston.webp',
            instagram: 'kingston_ig',
            tiktok: 'kingston_tok',
            facebook: 'kingston_fb',
            noTelepon: '081234567906'
        },
        {
            id: uuidv4(),
            username: 'mackenzie',
            password: 'hashedPassword18',
            name: 'Mackenzie',
            age: 27,
            address: '1515 Cedar St, Valleyview',
            job: 'Psychologist',
            hobbies: ['Reading', 'Traveling'],
            email: 'mackenzie@example.com',
            profileUrl: '/images/Mackenzie.webp',
            instagram: 'mackenzie_ig',
            tiktok: 'mackenzie_tok',
            facebook: 'mackenzie_fb',
            noTelepon: '081234567907'
        },
        {
            id: uuidv4(),
            username: 'sawyer',
            password: 'hashedPassword19',
            name: 'Sawyer',
            age: 30,
            address: '1616 Oak St, Hilltop',
            job: 'Architect',
            hobbies: ['Running', 'Photography'],
            email: 'sawyer@example.com',
            profileUrl: '/images/Sawyer.webp',
            instagram: 'sawyer_ig',
            tiktok: 'sawyer_tok',
            facebook: 'sawyer_fb',
            noTelepon: '081234567908'
        },
        {
            id: uuidv4(),
            username: 'katherine',
            password: 'hashedPassword20',
            name: 'Katherine',
            age: 33,
            address: '1717 Pine St, Woodland',
            job: 'Software Engineer',
            hobbies: ['Coding', 'Reading'],
            email: 'katherine@example.com',
            profileUrl: '/images/Katherine.webp',
            instagram: 'katherine_ig',
            tiktok: 'katherine_tok',
            facebook: 'katherine_fb',
            noTelepon: '081234567909'
        }
    ];
    function hashPassword(password) {
        return sha256(password + 10);
    }


    // useEffect(() => {
    //     let res = users.map((item) => {
    //         item.password = hashPassword(item.username);
    //         return item;
    //     });

    //     console.log(res)
    // }, [])

    useEffect(() => {

        // const userRelationship: any[] = [
        //     {
        //         "id": "",
        //         "userId1": "00da068b-e527-4dfa-993d-aea7266bf831",
        //         "userId2": "837e35ec-e846-43d4-be35-c852702d5be1"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "87732d8d-37eb-4262-a4c1-9efc895a4b37",
        //         "userId2": "00da068b-e527-4dfa-993d-aea7266bf831"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "00da068b-e527-4dfa-993d-aea7266bf831",
        //         "userId2": "a697c436-f42e-4369-a870-26b3bfb7b7a0"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "837e35ec-e846-43d4-be35-c852702d5be1",
        //         "userId2": "9e370651-0c53-4dde-976d-3d35ffc2dbba"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "dffe7199-05e8-4882-a087-67579e2b1075",
        //         "userId2": "837e35ec-e846-43d4-be35-c852702d5be1"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "9e370651-0c53-4dde-976d-3d35ffc2dbba",
        //         "userId2": "2106bdbd-77f4-4de8-88b6-45e52167ab64"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "b659ec37-dad4-455e-93c8-e0571c7efe5c",
        //         "userId2": "dffe7199-05e8-4882-a087-67579e2b1075"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "608a4baf-3215-4491-a31f-bb0fe897412b",
        //         "userId2": "b659ec37-dad4-455e-93c8-e0571c7efe5c"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "87732d8d-37eb-4262-a4c1-9efc895a4b37",
        //         "userId2": "3c7c4954-aa4e-487c-a669-6576a1204d81"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "7392e1c1-7089-49f0-99d8-31f08a3e12f7",
        //         "userId2": "87732d8d-37eb-4262-a4c1-9efc895a4b37"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "39a5392a-44e3-416b-81b9-ded6bacf1c80",
        //         "userId2": "7392e1c1-7089-49f0-99d8-31f08a3e12f7"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "bb93d15f-dacf-40a9-b235-05fd904de5eb",
        //         "userId2": "7392e1c1-7089-49f0-99d8-31f08a3e12f7"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "bb93d15f-dacf-40a9-b235-05fd904de5eb",
        //         "userId2": "b59e3606-69cf-4365-8d67-060fc430fc26"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "a697c436-f42e-4369-a870-26b3bfb7b7a0",
        //         "userId2": "c07a3f97-34ca-42ff-9ffc-de4709ab3c83"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "a697c436-f42e-4369-a870-26b3bfb7b7a0",
        //         "userId2": "b2d01453-c862-4f4d-bc2b-2d8cc6688de2"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "b2d01453-c862-4f4d-bc2b-2d8cc6688de2",
        //         "userId2": "52d3ad6b-5dd7-4f51-b81e-48893a40daf8"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "b2d01453-c862-4f4d-bc2b-2d8cc6688de2",
        //         "userId2": "9ee40580-ada8-4013-ab9b-12122f05c52f"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "b2d01453-c862-4f4d-bc2b-2d8cc6688de2",
        //         "userId2": "a4be14ff-660d-4708-9b40-06161f6d8d19"
        //     },
        //     {
        //         "id": "",
        //         "userId1": "52d3ad6b-5dd7-4f51-b81e-48893a40daf8",
        //         "userId2": "77deb7b1-2b57-441a-96e1-78ecdff12fb6"
        //     },
        // ]
        // let newData = userRelationship.map((item) => {
        //     return {
        //         id: uuidv4(),
        //         userId1: item.userId1,
        //         userId2: item.userId2
        //     }
        // });
        // console.log(newData)

    }, []);
    // useEffect(() => {
    //     // Ini dijalankan saat komponen di-mount
    //     console.log('Komponen di-mount');

    //     // Fungsi ini dijalankan saat komponen di-unmount
    //     return () => {
    //         console.log('Komponen di-unmount');
    //     };
    // }, []); // Array kosong berarti efek ini hanya dijalankan sekali saat mount

    // "transform: scale(1); transition: transform 0.3s ease;"
    return (<div>
        <div>My Component</div>
        <button style={{
            transform: "scale(1)",
            transition: "transform 0.3s ease"
        }}>
            Hover Saya
        </button>
    </div>)
}

export default MyComponent;