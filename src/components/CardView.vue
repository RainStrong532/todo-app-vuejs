<template>
  <div class="card-view" @click="gotoDetail">
    <h1>Tiêu đề</h1>
    <p>
      {{ date.getDate() }}/{{date.getMonth()+1}}/{{date.getFullYear()}}
    </p>
  </div>
</template>

<script>
export default {
  name: "CardView",
  props:{

  },
  data() {
    return {
      date: new Date(),
    };
  },
  methods: {
      gotoDetail(){
          this.$router.push('/card-detail');
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