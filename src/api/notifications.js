import request from '@/utils/request'

export function sendNotification(data) {
    return request({
        url: 'sendNotification',
        method: 'post',
        data
    })
}
