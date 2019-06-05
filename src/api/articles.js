import request from '@/utils/request'

export function createArticle(data) {
    return request({
        url: 'createArticle',
        method: 'put',
        data
    })
}


export function updateArticle(data, id) {
    return request({
        url: `updateArticle/${id}`,
        method: 'put',
        data
    })
}


export function deleteArticle(id) {
    return request({
        url: `deleteArticle/${id}`,
        method: 'delete'
    })
}


export function getArticle(data) {
    return request({
        url: 'getArticle',
        method: 'post',
        data
    })
}

export function getArticleById(id) {
    return request({
        url: `getArticle/${id}`,
        method: 'get'
    })
}
