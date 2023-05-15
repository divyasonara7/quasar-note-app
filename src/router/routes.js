
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Index.vue') },
      { path: '/note/:id?', component: () => import('src/pages/NoteEditor.vue') },
      { path: '/note/view/:id', component: () => import('src/pages/NoteView.vue') },
      { path: '/help', component: () => import('pages/help.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
