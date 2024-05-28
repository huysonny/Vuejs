import { createRouter, createWebHistory } from 'vue-router';
import HomepageVue from '../home/homepage.vue';
import AddStudent from '../addStudent/addStudent.vue';

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
