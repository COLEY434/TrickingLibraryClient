const initState = () => ({
  uploadPromise: null
});

export const state = initState;

export const mutations = {
  setTask(state, { uploadPromise }) {
    state.uploadPromise = uploadPromise;
  },
  reset(state) {
    Object.assign(state, initState());
  }
};
export const actions = {
  startVideoUpload({ commit, dispatch }, form) {
    const uploadPromise = this.$axios.$post(
      "https://localhost:5001/api/videos",
      form
    );
    commit("setTask", { uploadPromise });
  }
};
