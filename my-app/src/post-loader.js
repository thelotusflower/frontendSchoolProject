import { bestTimelinePosts } from './bestTimelinePosts.js';
const fetch = require('node-fetch');

async function getPosts(offset, publicId) {
    const api_token = 'b8f60840820308226b63b9246fcf2b932920096f069c00e9ea3bd1d92a469eff227aff4b9d764be579964';
    let count = 100;
    let publicIdArg = publicId.id ? `ownerId=${publicId.id}` : `domain=${publicId.domain}`;
    let url = `https://api.vk.com/method/wall.get?${publicIdArg}&v=5.52&access_token=${api_token}&count=${count}&offset=${offset}`;

    let response = await fetch(url);
    let body = await response.json()

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

export async function getTopNPostsFromGroups(groupUrls, limit) {
    const groupIds = groupUrls.map((el) => {
        let lastSlashIdx = el.lastIndexOf('/') + 1;
        let groupId = el.slice(lastSlashIdx, el.length - 1);
        let publicPrefix = 'public';

        if (groupId.startsWith(publicPrefix)) {
            groupId = '-' + groupId.slice(publicPrefix.length - 1, el.length - 1);
        }

        return el.slice(el.lastIndexOf('/'), el.length - 1);
    });
    let posts = await loadPostsFromGroups(groupIds);

    return bestTimelinePosts(posts, limit)
}
