<template>
  <div>
    <v-file-input accept="video/*" @change="hanfleFile"></v-file-input>

      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <div v-if="tricks">
        <p v-for="(t,index) in tricks" :key="index">
          {{t.name}}
        </p>
      </div>

      <div>
        
        <v-text-field label="Tricking name" v-model="trickName"></v-text-field>
        <v-btn @click="saveTrick">Save Trick</v-btn>
      </div>
      
          {{message}}
          <v-btn @click="reset">Reset Message</v-btn>
          <v-btn @click="resetTricks">Reset Tricks</v-btn>
   </div>               
</template>

<script>
import {mapState,  mapActions, mapMutations} from 'vuex'
import axios from "axios"
export default {
  data: () => ({
    trickName: ''
  }),
  computed: {
    ...mapState({
    message: state => state.message
    }),
    ...mapState('tricks',{
    tricks: state => state.tricks
    })
  },

  methods: {
    ...mapMutations([
    'reset'
    ]),
     ...mapMutations('tricks',{
    resetTricks: 'reset'
     }),
    
  ...mapActions('tricks', ['createTrick']),
  async saveTrick(){
    await this.createTrick({trick: {name: this.trickName}})
    this.trickName = ""
  },
  async hanfleFile(file){
    if(!file) return

    const form = new FormData()
    form.append("video", file)
    const result = await axios.post("https://localhost:5001/api/videos", form)
    console.log("Results:", result)
  }
  },
    

  async fetch(){
    await this.$store.dispatch('nuxtServerInit')
 }
  
}
</script>
