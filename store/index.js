import axios from 'axios'

const initState = () => ({
    message: "Init"
})

export const state = initState

export const mutations = {
    setMessage(state, message){
        state.message = message
    },
    reset(state){
        Object.assign(state, initState())
    }
}
export const actions = {
     async nuxtServerInit({commit}){
        const message = (await axios.get('http://localhost:5000/api/Home/Name')).data
        commit("setMessage", message)
    }
}