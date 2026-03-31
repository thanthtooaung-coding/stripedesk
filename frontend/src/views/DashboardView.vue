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
    <button @click="logout" class="logout-btn">Log out</button>
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

.logout-btn {
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #e0e0f0;
  background: #1a1a2e;
  border: 1px solid #2a2a45;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.logout-btn:hover {
  border-color: #6c47ff;
  background: #22223a;
}
</style>
