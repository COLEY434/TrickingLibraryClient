const initState = () => ({
  uploadPromise: null,
  active: false,
  component: null
});

export const state = initState;

export const mutations = {
  activate(state, {component}){
    state.active = true,
    state.component = component
  },
  hide(state){
    state.active = false
  },
  setTask(state, { uploadPromise }) {
    state.uploadPromise = uploadPromise;
  },
  reset(state) {
    Object.assign(state, initState());
  }
};
export const actions = {
  startVideoUpload({ commit, dispatch }, form) {
    const uploadPromise = this.$axios.$post("/api/videos", form);
    commit("setTask", { uploadPromise });
  },
  async createSubmissions({ state, commit, dispatch }, { form }) { 
    if (!state.uploadPromise) {
      console.log("Upload task is null");
      return;
    }
    form.video = await state.uploadPromise;
    await dispatch("submissions/createSubmissions", {form}, {root: true})
    commit('reset')
  }
};
