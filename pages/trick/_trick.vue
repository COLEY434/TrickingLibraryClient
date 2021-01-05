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

   
      <v-sheet class="pa-3 ma-2 sticky">
        <div class="text-h5">
           <span>{{ trick.name}}</span> 
           <v-chip class="mb-1 ml-2" small :to="`/difficulty/${difficulty.id}`">{{ difficulty.name}} Difficulty</v-chip>
           </div>
        <v-divider class="my-1"></v-divider>
        <div class="text-body-2">{{ trick.description}}</div>
        <v-divider class="my-1"></v-divider>        
        <div v-for="(rd,name, index) in relatedData" :key="index" >
          <div v-if="rd.data.length > 0">
             <div class="text-subtitle-1">{{rd.title}}</div>
        <v-chip-group>
          <v-chip v-for="d in rd.data" :key="rd.idFactory(d)" small :to="rd.routeFactory(d)">
            {{ d.name}}
          </v-chip>
        </v-chip-group>
          </div>
         
        </div>
      </v-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    trick: null,
    difficulty: null
  }),
  computed: {
    ...mapState("submissions", ["submissions"]),
    ...mapState("tricks", ["categories", "tricks"]),
    ...mapGetters('tricks', ['trickById', 'difficultyById']),
   
    trickCategories(){
      return this.categories.filter(x => this.trick.categories.indexOf(x.id) >= 0)
    },

    relatedData () {
      return [
        {
          title: "Categories",
          data: this.categories.filter(x => this.trick.categories.indexOf(x.id) >= 0),
          idFactory: c => `category-${c.id}`,
          routeFactory: c => `/category/${c.id}`
        },
        {
          title: "Prerequisites",
          data: this.tricks.filter(x => this.trick.prerequisites.indexOf(x.id) >= 0),
          idFactory: t => `trick-${t.id}`,
          routeFactory: t => `/trick/${t.id}`
        },
        {
          title: "Progressions",
          data: this.tricks.filter(x => this.trick.progressions.indexOf(x.id) >= 0),
          idFactory: t => `trick-${t.id}`,
          routeFactory: t => `/trick/${t.id}`
        }
      ]
    }

    },
  async fetch() {
    const trickId = this.$route.params.trick;
    this.trick = this.trickById(this.$route.params.trick)
    this.difficulty = this.difficultyById(this.trick.difficulty)
    await this.$store.dispatch(
      "submissions/fetchSubmissionsForTrick",
      { trickId },
      { root: true }
    );
  },
  head(){
    return {
      title: this.trick.name,
      meta: [
        {hid: 'description', name: 'description', content: this.trick.description}
      ]
    }
  }
};
</script>

<style scoped>

</style>