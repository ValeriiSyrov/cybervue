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


export function deleteCategoryUser(id) {
    return request({
        url: `deleteCategoryUser/${id}`,
        method: 'delete'
    })
}


export function createCategory(data) {
    return request({
        url: 'createCategory',
        method: 'post',
        params: {
            data
        }
    })
}


export function updateCategory(data) {
    return request({
        url: 'updateCategory',
        method: 'put',
        params: {
            data
        }
    })
}
