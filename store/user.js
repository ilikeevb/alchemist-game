export const state = () => ({
    name: '',

})

export const getters = {
    getUserName(state) {
        let localName = typeof window !== 'undefined' ? localStorage.getItem('name') : null;
        
        if (state.name) {
            return state.name;
        } else if (localName) {
            return localName;
        } else {
            return null;
        }
    }
}

export const mutations = {
    SET_NAME(state, name) {
        state.name = name;
    },
}

export const actions = {
    async RENAME_USER({ commit }, name) {
        localStorage.setItem('name', name)
        commit('SET_NAME', name)
    },
}