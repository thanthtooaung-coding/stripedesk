import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import { theme } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd, {
  theme: {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#6c47ff',
      colorBgContainer: '#1a1a2e',
      colorBgElevated: '#1a1a2e',
      borderRadius: 10,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
  },
})

app.mount('#app')
