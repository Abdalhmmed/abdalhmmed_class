import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'portal-home',
      component: () => import('@/views/PortalHomeView.vue')
    },
    {
      path: '/courses/data-structures/lecture-01',
      name: 'ds-lecture-01',
      component: () => import('@/views/DsLecture01View.vue')
    },
    {
      path: '/courses/data-structures/lecture-02',
      name: 'ds-lecture-02',
      component: () => import('@/views/DsLecture02View.vue')
    },
    {
      path: '/courses/cybersecurity/lecture-01',
      name: 'cyber-lecture-01',
      component: () => import('@/views/CyberLecture01View.vue')
    },
    {
      path: '/courses/unity-game-dev/lecture-01',
      name: 'unity-lecture-01',
      component: () => import('@/views/UnityLecture01View.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
