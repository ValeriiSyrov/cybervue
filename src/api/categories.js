import request from '@/utils/request'

export function getCategory(data) {
    return request({
        url: 'getCategory',
        method: 'get',
        params: {
            data
        }
    })
}


export function deleteCategory(id) {
    return request({
        url: `deleteCategory/${id}`,
        method: 'delete'
    })
}


export function createCategory(data) {
    return request({
        url: 'createCategory',
        method: 'post',
        data
    })
}


export function updateCategory(data, id) {
    return request({
        url: `updateCategory/${id}`,
        method: 'put',
        data
    })
}
