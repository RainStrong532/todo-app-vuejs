<template>
  <div class="card-container">
    <div>
      <div
        v-if="$router.currentRoute.params.id"
        class="saved-status"
        :class="{ saved: saved }"
        @click="saveData"
      >
        saved
      </div>
      <div class="date-time">
        <div class="date">{{ new Date(date).getDate() }}</div>
        <div class="day">{{ days[new Date(date).getDay()] }}</div>
        <div class="month">{{ months[new Date(date).getMonth()] }}</div>
        <div class="year">{{ new Date(date).getFullYear() }}</div>
        <div class="count">
          <p>
            {{ lt.filter((item) => item.status).length }}/{{
              lt.length
            }}
          </p>
        </div>
        <div class="arrow" @click="beforeOneDay">
          <img src="@/assets/images/arrow-left.svg" alt="icon" />
        </div>
        <div class="arrow" @click="afterOneDay">
          <img src="@/assets/images/arrow-right.svg" alt="icon" />
        </div>
      </div>
      <div class="list-todo">
        <ul class="list">
          <li class="item" v-for="(t, index) of lt" v-bind:key="index">
            <p :class="{ enable: t.status }">{{ t.name }}</p>
            <div @click="changeStatus(index)">
              <img v-if="!t.status" src="@/assets/images/sad.svg" alt="icon" />
              <img
                v-else
                src="@/assets/images/happy.svg"
                alt="icon"
                class="icon"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <b-button class="add-new-todo" v-b-modal.modal-1 variant="primary"
        >Add new todo</b-button
      >
      <div>
        <b-modal
          id="modal-1"
          title="Add new todo"
          @hidden="resetModal"
          @ok="handleSubmit"
        >
          <form ref="form">
            <b-form-group
              label="Enter your todo to add to the card"
              label-for="name-input"
            >
              <b-form-input id="name-input" v-model="item.name"></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>
      <div class="add">
        <b-button
          v-if="!$router.currentRoute.params.id"
          variant="success"
          @click="handleAddNewTodo"
        >
          Add
        </b-button>
        <b-button v-else v-b-modal.modal-2 variant="danger">Remove</b-button>
        <div>
          <b-modal id="modal-2" title="Notify" @ok="handleDelete" hide-footer>
            <h3>Are you sure about that?</h3>
            <hr />
            <div class="btn-cnt">
              <b-button variant="secondary" @click="closeModal($event)">
                No
              </b-button>
              <b-button variant="primary" @click="handleDelete($event)">
                Yes
              </b-button>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { days, months } from "../../constants";
import { addTodo, deleteTodo } from "../fetchApis";
export default {
  name: "card",
  props: {
    todo: {
      type: Object,
      default: () => null,
    },
    title: {
      type: String,
      default: () => "untitle",
    },
    saved: {
      type: Boolean,
      default: () => false,
    },
    lt: {
      type: Array,
      default: () => []
    },
    date: {
      type: String,
      default: () => new Date().toString()
    }
  },
  data() {
    return {
      item: {
        name: "",
        status: false,
      },
      days,
      months,
    };
  },
  watch: {
    tl: function(){
      console.log("props change");
    }
  },
  mounted() {
    console.log("todo: ", this.listTodo);
  },
  methods: {
    handleSubmit(bvModalEvt) {
      bvModalEvt.preventDefault;
      if (this.item.name.length > 0) {
        let itemAdd = { ...this.item};
        this.$emit("addNewTodo", itemAdd);
        this.$nextTick(() => {
          this.$bvModal.hide("modal-1");
        });
      } else {
        alert("Your todo is empty!");
        return;
      }
    },
    resetModal() {
      this.item.name = "";
    },
    afterOneDay() {
      const d = new Date(new Date(this.date).getTime() + 24 * 60 * 60 * 1000);
      this.$emit("updateDate", d.toString());
    },
    beforeOneDay() {
      const d = new Date(new Date(this.date).getTime() - 24 * 60 * 60 * 1000);
      this.$emit("updateDate", d.toString());
    },
    changeStatus(index) {
      this.$emit("changeStatus", index);
    },
    handleDelete: async function (bvModalEvt) {
      bvModalEvt.preventDefault;
      try {
        const res = await deleteTodo({ id: this.todo.id });
        console.log(res);
        this.$router.push("/");
      } catch (err) {
        alert(err);
      }
      this.$nextTick(() => {
        this.$bvModal.hide("modal-2");
      });
    },
    closeModal() {
      this.$nextTick(() => {
        this.$bvModal.hide("modal-2");
      });
    },
    handleAddNewTodo: async function () {
      try {
        let data = {
          listTodo: this.lt,
          date: this.date,
          title: this.title,
        };
        const res = await addTodo(data);
        console.log(res);
        this.$router.push("/todo/" + res.id);
      } catch (err) {
        alert(err);
      }
    },
    saveData(){
      this.$emit("update");
    }
  },
};
</script>

<style scoped>
.card-container {
  width: 500px;
  height: 80vh;
  min-height: 680px;
  box-shadow: 2px 3px 12px #666;
  border-radius: 8px;
  background: #eee;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-container > div:first-child {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.card-container > div:first-child > div:last-child {
  flex-grow: 1;
}
.list-todo {
  display: flex;
  flex-direction: row;
  padding: 0 10px;
}
.list {
  list-style-type: none;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
  overflow-y: scroll;
  height: 280px;
}
.item {
  display: flex;
  padding: 10px 24px;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  margin-right: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.item:hover,
.item:nth-child(even) {
  background: rgba(0, 0, 0, 0.1);
}
.item p {
  margin: 0;
  text-align: left;
}
.item p.enable {
  text-decoration: line-through;
  color: #666;
}
.item img {
  cursor: pointer;
  margin-left: 10px;
  width: 24px;
  height: auto;
}
.item:nth-child(even) {
  background: rgba(0, 0, 0, 0.2);
}
.add {
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.add button {
  padding: 8px 32px;
  text-transform: uppercase;
}
.add-new-todo {
  margin-bottom: 40px;
  padding: 8px 32px;
}
.date-time {
  margin-top: 25px;
  position: relative;
  padding: 0 20px;
}
.date,
.month {
  font-size: 48px;
}
.day,
.year {
  font-size: 24px;
}
.date-time .arrow:last-child {
  right: 20px;
}
.arrow {
  height: 30px;
  top: 50%;
  position: absolute;
  transform: translateY(50%);
  cursor: pointer;
}
.arrow img {
  height: 100%;
  width: auto;
}
/* width */
.list::-webkit-scrollbar {
  width: 15px;
}

/* Track */
.list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 7.5px;
}

/* Handle */
.list::-webkit-scrollbar-thumb {
  background: #83e7ba;
  border-radius: 7.5px;
}

/* Handle on hover */
.list::-webkit-scrollbar-thumb:hover {
  background: #83e7ba;
}
.saved-status {
  position: fixed;
  top: 30px;
  right: 30px;
  padding: 10px 20px;
  background: #e74c3c;
  color: #fff;
  border-radius: 8px;
  box-shadow: 1px 2px 6px #666;
  cursor: context-menu;
}
.saved {
  background: #5dade2;
}
.btn-cnt {
  display: flex;
  justify-content: flex-end;
}
.btn-cnt button {
  margin: 0 10px;
}
</style>