import request from '@/utils/request'

export function createEvent(data) {
    return request({
        url: 'createEvent',
        method: 'post',
        data
    })
}


export function updateEvent(data, id) {
    return request({
        url: `updateEvent/${id}`,
        method: 'put',
        data
    })
}


export function deleteEvent(id) {
    return request({
        url: `deleteEvent/${id}`,
        method: 'delete'
    })
}


export function getEvents(params) {
    return request({
        url: 'getEventsAll',
        method: 'get',
        params
    })
}
