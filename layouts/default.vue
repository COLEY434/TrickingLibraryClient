<template>
  <v-app dark>
    <v-app-bar app dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Tricking Library</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn depressed @click="toggleActivity">Upload</v-btn>
    </v-app-bar>
    <video-upload />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import VideoUpload from "../components/video-upload";
export default {
  components: {
    VideoUpload,
  },
  methods: mapMutations("videos-upload", ["toggleActivity"]),
};
</script>
