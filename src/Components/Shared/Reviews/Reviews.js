import React from 'react';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
    const reviews = [
        {
            "postId": 1,
            "rating": 3,
            "time": "19 hours ago",
            "id": 1,
            "name": "Khandaker Samia",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        },
        {
            "postId": 1,
            "rating": 2,
            "time": "8 hours ago",
            "id": 2,
            "name": "Rahima Begum",
            "email": "Jayne_Kuhic@sydney.com",
            "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
        },
        {
            "postId": 1,
            "rating": 5,
            "time": "23 hours ago",
            "id": 3,
            "name": "Seikh Faizul",
            "email": "Nikita@garfield.biz",
            "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
        },
        {
            "postId": 1,
            "rating": 3,
            "time": "5 hours ago",
            "id": 4,
            "name": "Rifat",
            "email": "Lew@alysha.tv",
            "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
        },
        {
            "postId": 1,
            "rating": 4,
            "time": "11 hours ago",
            "id": 5,
            "name": "Shufol Islam",
            "email": "Hayden@althea.biz",
            "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
        },
        {
            "postId": 2,
            "rating": 4,
            "time": "16 hours ago",
            "id": 6,
            "name": "Khandaker Sajal",
            "email": "Presley.Mueller@myrl.com",
            "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
        },
        {
            "postId": 2,
            "rating": 1,
            "time": "23 hours ago",
            "id": 7,
            "name": "The Killer",
            "email": "Dallas@ole.me",
            "body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
        },
        {
            "postId": 2,
            "rating": 3,
            "time": "4 hours ago",
            "id": 8,
            "name": "AK Lover",
            "email": "Mallory_Kunze@marie.org",
            "body": "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"
        },
        {
            "postId": 2,
            "rating": 5,
            "time": "19 hours ago",
            "id": 9,
            "name": "luuv You",
            "email": "Meghan_Littel@rene.us",
            "body": "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus"
        },
        {
            "postId": 2,
            "rating": 1,
            "time": "16 hours ago",
            "id": 10,
            "name": "The Rising Star",
            "email": "Carmen_Keeling@caroline.name",
            "body": "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis"
        }
    ];
    return (
        <div className='home-container'>
            <div className="feedbacks-section mb-5 pb-5">
                <h3 className='text-center text-2xl font-bold text-orange-400'>All Reviews</h3>
                <small className='block text-center mb-4'>You can see all the reviews of our parts here</small>
                <div className="reviews bg-white p-8 flex flex-wrap gap-5 justify-center">
                    {
                        reviews.map(review => {
                            const { id, name, rating, time, body } = review;

                            return <div key={id} className='max-w-[400px] flex'>
                                <div className='comment shadow-sm flex flex-col mx-auto p-3 px-lg-5 border border-1 rounded rounded-5'>
                                    <div className="comment-up-section flex">
                                        <img src={`/img/avatars/${id}.jpg`} alt="user avatar" className='rounded-full border-2 border-success w-[50px] h-[50px] mr-2' />
                                        <div className="flex justify-between items-center grow">
                                            <div className="flex flex-col ms-3">
                                                <div className="">{name}</div>
                                                <Rating
                                                    initialRating={rating}
                                                    emptySymbol={<FaStar style={{ color: '#ccc' }} />}
                                                    fullSymbol={<FaStar style={{ color: 'green' }} />}
                                                    readonly
                                                ></Rating>
                                            </div>
                                            <div className="comment-time" style={{ color: '#aaa' }}>
                                                {time}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-body mt-3" style={{ textTransform: 'capitalize', color: '#818181' }}>
                                        {body}
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div >
    );
};

export default Reviews;