<template>
  <div class="home">
    <b-input
      v-show="changeTitle"
      placeholder="Enter title"
      v-model="title"
      :value="title"
      v-on:blur="changeTitle = false"
      v-on:keyup.enter="changeTitle = false"
      ref="input-title"
    />
    <h1
      v-show="!changeTitle"
      v-on:dblclick="showInput"
      title="Double click to edit"
    >
      {{ title || "untitle" }}
    </h1>
    <div class="card-cnt">
      <card :title="title" />
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  components: { Card },
  name: "CardDetail",
  data() {
    return {
      title: "untitle",
      changeTitle: false,
    };
  },
  watch: {
    title: () => {
      console.log("title change");
    }
  },
  methods: {
    showInput() {
      this.changeTitle = true;
      setTimeout(() => {
        this.$refs["input-title"].focus();
      }, 100);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
input {
  margin: 20px;
  text-align: center;
}
h1 {
  cursor: pointer;
}
input {
  max-width: 500px;
  font-size: 24px;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
