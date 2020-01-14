function bestTimelinePosts(props) {
    const post = props.id;
    const rating = likes + comments * 2 + reposts * 3; // как вариант - добавить views * 0.5
    const postList = props.posts.map((post) => {
        return (
            <ul>
            {props.posts.map((post) =>
            <li key ={post.id} {...post}
            id = {id}
                rating ={rating}>
            </li>
            )}
            </ul>
        );}
    )
}

// Логика рейтинга постов: 1 лайк - 1 поинт, 1 комментарий - 2, комментарий - 3
// Следовательно рейтинг строится по формуле: рейтинг(число) = кол-во лайков + кол-во комментариев *2 + кол-во репостов *3
const timeline = [
    {id: 1, rating:{rating: number }},
    {id: 2, rating:{rating: number }},
    {id: 3, rating:{rating: number }}
];

timeline.sort((a, b) => b.rating - a.rating );



ReactDOM.render(
    <PostsRating timeline={timeline} />,
    document.getElementById('root')
);