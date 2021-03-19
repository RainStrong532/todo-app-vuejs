import Home from '../components/Home.vue';
import CardDetail from '../components/CardDetail.vue'
import ErrorComp from '../components/Error.vue'

export const routes = [
    { path: '/', component: Home },
    { path: '/card-detail', component: CardDetail },
    {path: '*', component: ErrorComp}
  ]