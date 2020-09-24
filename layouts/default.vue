<template>
  <v-app dark>
    <v-app-bar app dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Tricking Library</v-toolbar-title>

      <v-spacer></v-spacer>
      <video-upload />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import VideoUpload from "../components/video-upload";
export default {
  components: {
    VideoUpload,
  },
  // async fetch() {
  //   await this.$store.dispatch("nuxtServerInit");
  // },
};
</script>
