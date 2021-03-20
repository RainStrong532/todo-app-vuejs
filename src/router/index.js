import Home from '../components/Home.vue';
import CardDetail from '../components/CardDetail.vue'
import ErrorComp from '../components/Error.vue'
import AddTodo from '../components/AddTodo'

export const routes = [
    { path: '/', component: Home },
    { path: '/todo/:id', component: CardDetail },
    {path: '*', component: ErrorComp},
    {path: '/todos/add', component: AddTodo, name: 'add-todo'},
  ]