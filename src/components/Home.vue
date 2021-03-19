<template>
  <div class="home">
    <h1>Todo list in Vue</h1>
    <div class="card-cnt">
      <card-view/>
    </div>
  </div>
</template>

<script>
import CardView from './CardView.vue';
export default {
  components: { CardView },
  name: "home",
  props: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 20px;
}
.home{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-cnt{
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 60px;
}
</style>
