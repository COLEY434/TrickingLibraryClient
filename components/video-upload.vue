<template>
  <v-dialog :value="active" persistent>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" depressed @click="toggleActivity">Upload</v-btn>
    </template>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"
          >Select Type</v-stepper-step
        >

        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2"
          >Trick Information</v-stepper-step
        >

        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3"
          >Upload Video</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 4" step="4"
          >Submission Information</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="5">Review</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="d-flex flex-column align-center">
            <v-btn class="my-2" @click="setType(uploadType.TRICK)">Trick</v-btn>
            <v-btn class="my-2" @click="setType(uploadType.SUBMISSION)"
              >Submission</v-btn
            >
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div>
            <v-text-field
              label="Tricking name"
              v-model="trickName"
            ></v-text-field>
            <v-btn @click="incStep">Save Trick</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div>
            <v-file-input accept="video/*" @change="hanfleFile"></v-file-input>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div>
            <v-text-field
              label="Description"
              v-model="submission"
            ></v-text-field>
            <v-btn @click="incStep">Save submission</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-btn @click="Save">Save</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <div class="d-flex justify-center my-4">
      <v-btn @click="toggleActivity">Close</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import { UPLOAD_TYPE } from "../data/enum.js";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "video-upload",
  data: () => ({
    trickName: "",
    submission: "",
  }),
  computed: {
    ...mapState("videos-upload", ["uploadPromise", "active", "step"]),
    uploadType() {
      return {
        ...UPLOAD_TYPE,
      };
    },
  },

  methods: {
    ...mapMutations("videos-upload", [
      "reset",
      "incStep",
      "toggleActivity",
      "setType",
    ]),
    ...mapActions("videos-upload", ["startVideoUpload", "createTrick"]),

    async hanfleFile(file) {
      if (!file) return;

      const form = new FormData();
      form.append("video", file);
      this.startVideoUpload(form);
    },
    async Save() {
      if (!this.uploadPromise) {
        console.log("Upload task is null");
        return;
      }
      const video = await this.uploadPromise;
      await this.createTrick({
        trick: { name: this.trickName },
        submission: { Description: this.submission, video, trickId: 1 },
      });
      this.trickName = "";
      this.submission = "";
      this.reset();
    },
  },
};
</script>
<style scoped>
</style>