<template>
  <div class="d-flex justify-center align-start">
    <div class="mx-2" v-if="submissions">
      <div v-for="(x, index) in 1" :key="index">
        <div v-for="(s, index) in submissions" :key="index">
          {{ s.id }} - {{ s.description }} - {{ s.trickId }}
          <div>
            <video
              width="300"
              controls
              :src="`https://localhost:5001/api/videos/${s.video}`"
            ></video>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-2 sticky">
      <div>Trick: {{ $route.params.trick }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("submissions", ["submissions"]),
  async fetch() {
    const trickId = this.$route.params.trick;
    await this.$store.dispatch(
      "submissions/fetchSubmissionsForTrick",
      { trickId },
      { root: true }
    );
  },
};
</script>

<style scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 48px;
}
</style>