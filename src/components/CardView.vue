<template>
  <div class="card-view" @click="gotoDetail">
    <h1>{{card.title}}</h1>
    <p>
      {{card.date}}
    </p>
  </div>
</template>

<script>
export default {
  name: "CardView",
  props:{
      card: {
        type: Object,
        default: () => null
      }
  },
  data() {
    return {
      date: new Date(),
    };
  },
  methods: {
      gotoDetail(){
          this.$router.push('/card-detail/'+this.card.id);
      }
  },
};
</script>

<style scoped>
.card-view{
    padding: 15px 20px;
    border-radius: 10px;
    background: #83e7ba;
    cursor: pointer;
    margin: 0 10px;
    box-shadow: 1px 2px 8px #999;
}
.card-view:hover{
    background: #42cbf8;
    transition: background .3s ease-in-out;
}
    h1{
        font-size: 20px;
        margin: 0;
    }
    p{
        margin: 0;
    }
</style>