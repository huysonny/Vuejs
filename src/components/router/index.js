import { createRouter, createWebHistory } from 'vue-router';
import HomepageVue from '../home/homepage.vue';
import AddStudent from '../addStudent/addStudent.vue';
import HomePageClass from '../homeClass/homePageClass.vue';
const routes = [
    {
        path: '/',
        redirect: '/homepage'  
    },
    {
        path: '/homepage',
        name: 'Homepage',
        component: HomepageVue
    },
    {
        path: '/add-student',
        name: 'AddStudent',
        component: AddStudent
    },
    {
        path: '/homeclass',
        name: 'HomePageClass',
        component: HomePageClass
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
