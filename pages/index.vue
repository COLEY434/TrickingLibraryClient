<template>
  <div>
    <div class="text-center">
      <logo />
      <vuetify-logo />
    </div>
    <div v-if="tricks">
      <div v-for="(t, index) in tricks" :key="index">
        {{ t.name }}
        <div>
          <video width="300" controls :src="`https://localhost:5001/api/videos/${t.video}`"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("tricks", ["tricks"]),
};
</script>
