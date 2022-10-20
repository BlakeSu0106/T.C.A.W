export const states = {
  status: '',
};
export const actions = {
};

export const mutations = {
  setState(state, data) {
    state[data.id] = data.value;
  },
};
export const getters = {
};

export default {
  states,
  actions,
  mutations,
  getters,
  namespaced: true,
};
