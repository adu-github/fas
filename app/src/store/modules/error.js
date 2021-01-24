const state = {
  message: null,
};

const mutations = {
  SET_MESSAGE(state, text) {
    state.message = text;
  },
};

const actions = {
  setErrorMessage(context, text) {
    context.commit('SET_MESSAGE', text);
  },
};

const getters = {};

export default {
  state,
  mutations,
  getters,
  actions,
};
