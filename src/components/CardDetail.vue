<template>
  <div class="home">
    <h1>Tiêu đề</h1>
    <div class="card-cnt">
      <card/>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
export default {
  components: { Card },
  name: "cardDetail",
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
</style>
