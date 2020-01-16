const fetch = require('node-fetch');

function bestTimelinePosts(posts, limit) {
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
    
    return Math.ceil(likes + comments * 2 + reposts * 3);
}


async function getPosts(offset, publicId) {
<<<<<<< HEAD
    const api_token = '31bd81a99b4ddc53e056fbd235106a19add11f67b2ab5bc9366a12dd9f3002d5f100941a6712b8ea3339d';
=======
    const api_token = 'e878717338e1d8b03b2481278365bf07078b6daa4153997f5e02748e94cae5c1b80483b17e8d827b8545a';
>>>>>>> d2108ff17622e7b9f4515c34179656a6922ca6c2
    let count = 100;
    let publicIdArg = publicId.id ? `ownerId=${publicId.id}` : `domain=${publicId.domain}`;
    let url = `https://api.vk.com/method/wall.get?${publicIdArg}&v=5.52&access_token=${api_token}&count=${count}&offset=${offset}`;

    let response = await fetch(url, {mode: 'no-cors'});
    let body = await response.json();

    return body.response.items;
}

async function getPostsFromPublic(publicId) {
    const dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - 1);

    let posts = [];
    let offset = 0;

    posts = posts.concat(await getPosts(offset, publicId));
    posts = posts.filter((el) => { return new Date(el.date * 1000) > dayAgo});

    return posts;

}

async function loadPostsFromGroups(groupIds) {
    let posts = [];

    for(let group of groupIds) {
        posts = posts.concat(await getPostsFromPublic(group));
    }

    return posts;
}

async function getTopNPostsFromGroups(groupUrls, limit) {
    const groupIds = groupUrls.map((el) => {
        let lastSlashIdx = el.lastIndexOf('/') + 1;
        let groupId = el.slice(lastSlashIdx, el.length);
<<<<<<< HEAD
        console.log(groupId);
        let publicPrefix = 'public';
        let type = 'domain';

=======
        let publicPrefix = 'public';
        let type = 'domain';        
        
>>>>>>> d2108ff17622e7b9f4515c34179656a6922ca6c2
        if (groupId.startsWith(publicPrefix)) {
            type = 'ownerId';
            groupId = '-' + groupId.slice(publicPrefix.length - 1, el.length - 1);
        }        
        
        if (type === 'domain') {
            return {'domain': groupId, 'ownerId': null}
        } else {
            return {'domain': null, 'ownerId': groupId}
        }
<<<<<<< HEAD

        if (type === 'domain') {
            return {'domain': groupId, 'ownerId': null}
        } else {
            return {'domain': null, 'ownerId': groupId}
        }
=======
>>>>>>> d2108ff17622e7b9f4515c34179656a6922ca6c2
    });
    console.log(groupIds);
    let posts = await loadPostsFromGroups(groupIds);

    return bestTimelinePosts(posts, limit);
}

console.log('start');
getTopNPostsFromGroups(['https://vk.com/habr', 'https://vk.com/lentach']).then((value) => console.log(value));