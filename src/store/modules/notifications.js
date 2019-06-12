import { sendNotification } from '@/api/notifications'

const state = {}

const mutations = {}

const actions = {
    sendNotification({}, data) {
        return new Promise((resolve, reject) => {
            sendNotification(data).then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
