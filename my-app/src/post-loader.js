import { bestTimelinePosts } from './bestTimelinePosts.js';
const fetch = require('node-fetch');

async function getPosts(offset, publicId) {
    const api_token = '31bd81a99b4ddc53e056fbd235106a19add11f67b2ab5bc9366a12dd9f3002d5f100941a6712b8ea3339d';
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

export async function getTopNPostsFromGroups(groupUrls, limit) {
    const groupIds = groupUrls.map((el) => {
        let lastSlashIdx = el.lastIndexOf('/') + 1;
        let groupId = el.slice(lastSlashIdx, el.length);
        console.log(groupId);
        let publicPrefix = 'public';
        let type = 'domain';

        if (groupId.startsWith(publicPrefix)) {
            type = 'ownerId';
            groupId = '-' + groupId.slice(publicPrefix.length - 1, el.length - 1);
        }

        if (type === 'domain') {
            return {'domain': groupId, 'ownerId': null}
        } else {
            return {'domain': null, 'ownerId': groupId}
        }
    });
    console.log(groupIds);
    let posts = await loadPostsFromGroups(groupIds);

    return bestTimelinePosts(posts, limit)
}
