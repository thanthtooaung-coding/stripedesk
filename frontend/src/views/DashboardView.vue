<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Welcome, {{ auth.user?.name }} ({{ auth.user?.role }})</p>
    <a-button @click="logout">Log out</a-button>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #0f0f18;
  color: #f0f0ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-family: inherit;
}
</style>
