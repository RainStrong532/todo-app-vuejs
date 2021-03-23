<template>
  <div class="home">
    <b-input
      v-show="changeTitle"
      placeholder="Enter title"
      v-model="todo.title"
      :value="todo.title"
      v-on:blur="changeTitle = false"
      v-on:keyup.enter="updateData"
      ref="input-title"
      v-on:change="onChangeTitle($event)"
    />
    <h1
      v-show="!changeTitle"
      v-on:dblclick="showInput"
      title="Double click to edit"
    >
      {{ todo.title || "untitle" }}
    </h1>
    <div class="card-container">
      <card
        :title="todo.title"
        :todo="todo"
        :saved="saved"
        :lt="todo.listTodo"
        :date="todo.date"
        v-on:addNewTodo="addNewTodo"
        v-on:changeStatus="changeStatus"
        v-on:update="update"
        v-on:updateDate="updateDate"
      />
    </div>
  </div>
</template>

<script>
import { getDataById, updateTodo } from "../fetchApis";
import Card from "./Card.vue";
export default {
  components: { Card },
  name: "CardDetail",
  data() {
    return {
      changeTitle: false,
      todo: {
        listTodo: [],
        date: new Date().toString(),
      },
      saved: false,
    };
  },
  created: async function () {
    if (!this.$router.currentRoute.path.endsWith("/add")) {
      let id = this.$router.currentRoute.params.id;
      try {
        this.saved = false;
        console.log("id: ", id);
        let data = await getDataById({
          id: parseInt(id),
        });
        console.log("data: ", data);
        if (data.id) {
          this.todo = { ...data };
          console.log("updated", this.todo.listTodo);
          this.saved = true;
        } else {
          alert("Non exist!");
        }
      } catch (err) {
        alert(err);
      }
    }
  },
  mounted() {
    console.log("mounted");
  },
  watch: {},
  methods: {
    showInput() {
      this.changeTitle = true;
      setTimeout(() => {
        this.$refs["input-title"].focus();
      }, 100);
    },
    onChangeTitle: async function (newTitle) {
      this.todo.title = newTitle;
      this.saved = false;
    },
    update: async function () {
      this.saved = false;
      let id = this.$router.currentRoute.params.id;
      id = parseInt(id);
      if (id) {
        try {
          const res = await updateTodo(this.todo);
          console.log(res);
          this.saved = true;
        } catch (err) {
          alert(err);
        }
      }
    },
    updateData() {
      this.changeTitle = false;
      this.update();
    },
    addNewTodo(item) {
      this.todo.listTodo.push(item);
      this.update();
    },
    changeStatus(index) {
      this.todo.listTodo[index].status = !this.todo.listTodo[index].status;
      this.update();
    },
    updateDate(date) {
      this.todo.date = date;
      this.update();
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
