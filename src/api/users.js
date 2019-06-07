import request from '@/utils/request'

export function getUsers(params) {
    return request({
        url: 'getUsers',
        method: 'get',
        params
    })
}

export function createUser(data) {
    return request({
        url: 'createUser',
        method: 'post',
        data
    })
}

export function deleteUser(id) {
    return request({
        url: `user/${id}`,
        method: 'delete'
    })
}

export function updateUser(data, id) {
    return request({
        url: `updateUser/${id}`,
        method: 'put',
        data
    })
}
