<template>
  <v-dialog :value="active" persistent width="600">
    <template v-slot:activator="{on}">
       <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed v-bind="attrs"  v-on="on">
            Create
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in menuItems" :key="`ccd-menu-${i}`" @click="activate({component: item.component})">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  
<div v-if="component">
    <component :is="component"></component>
</div>

    <div class="d-flex justify-center my-4">
      <v-btn @click="reset">Close</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import CategoryForm from './category-form.vue';
import DifficultyForm from './difficulty-form.vue';
import SubmissionSteps from './submission-steps.vue';
import trickSteps from './trick-steps.vue';

export default {
  components: { trickSteps, SubmissionSteps, DifficultyForm, CategoryForm },
  name: "content-creation-dialog",
  computed: {
    ...mapState("videos-upload", ["active", "component"]),
    menuItems(){
      return [
        {component: trickSteps, title: "Trick"},
        {component: SubmissionSteps, title: "Submission"},
        {component: DifficultyForm, title: "Difficulty"},
        {component: CategoryForm, title: "Category"}
      ]
    }
  },

  methods: mapMutations("videos-upload", ["reset", "activate"]),

};
</script>
<style scoped>
</style>