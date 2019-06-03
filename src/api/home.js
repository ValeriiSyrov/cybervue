import request from '@/utils/request'

export function getHomeInfo(params) {
    return request({
        url: 'getHomeInfo',
        method: 'get',
        params
    })
}
