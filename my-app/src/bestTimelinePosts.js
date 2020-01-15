export function bestTimelinePosts(posts, limit) {
    return posts.map((post) => {
        post.rating = getPostRating(post);
        return post;
    }).sort((a, b) => {
        return b.rating - a.rating;
    }).slice(0, limit);
}

function getPostRating(post) {
    const likes = post.likes.count;
    const comments = post.comments.count;
    const reposts = post.reposts.count;
    const views = post.views.count;

    return Math.ceil((likes + comments * 2 + reposts * 3)/views);
}