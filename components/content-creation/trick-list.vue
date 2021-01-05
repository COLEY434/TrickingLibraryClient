<template>
    <div>
        <v-text-field v-model="filter" label="Search" placeholder="e.g cork/flip/kick" prepend-inner-icon="mdi-magnify" outlined></v-text-field>
        <div v-for="(t, index) in filteredTricks" :key="index">
         {{ t.name }} - {{ t.description }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'trick-list',
    props: {
        tricks: {
            required: true,
            type: Array
        }
    },
    data: () => ({
          filter: ""
    }),
    computed: {
         filteredTricks(){
          if(!this.filter){
              return this.tricks
          }

          const normalize = this.filter.trim().toLowerCase()

          return this.tricks.filter(t => t.name.toLowerCase().includes(normalize) || t.description.toLowerCase().includes(normalize))
      }
    }
}
</script>

<style>

</style>