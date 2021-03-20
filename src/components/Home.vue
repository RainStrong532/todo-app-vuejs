<template>
  <div class="home">
    <h1>Todo list in Vue</h1>
    <div class="card-cnt">
      <card-view v-for="todo of todos" v-bind:key="todo.id" :card="todo" />
      <div class="add">
        <b-button
          variant="primary"
          class="add-btn"
          @click="gotoAdd"
        >
          Add new todo
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import CardView from "./CardView.vue";
import { getData } from "../fetchApis";

export default {
  components: { CardView },
  data() {
    return { todos: [] };
  },
  name: "home",
  props: {},
  methods: {
    gotoAdd(){
      this.$router.push({name: 'add-todo'});
    },
  },
  created: async function () {
    try {
      const todos = await getData();
      this.todos = [...todos];
    } catch (err) {
      alert(err);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 20px;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-cnt {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 60px;
}
.add-btn{
  padding: 20px 30px;
  margin: 0 10px;
  box-shadow: 1px 2px 8px #999;
}
.add{
  display: flex;
  align-items: center;
}
</style>
