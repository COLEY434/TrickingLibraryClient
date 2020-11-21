<template>
  <v-app dark>
    <v-app-bar app dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Tricking Library</v-toolbar-title>

      <v-spacer></v-spacer>
     <content-creation-dailog></content-creation-dailog>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import ContentCreationDailog from '../components/content-creation/content-creation-dialog.vue';
export default {
  components: {
    ContentCreationDailog,
  },
};
</script>
