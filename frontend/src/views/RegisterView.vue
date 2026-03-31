<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errors = reactive({ name: '', email: '', password: '', confirmPassword: '' })

function validate() {
  errors.name = form.name.trim() ? '' : 'Full name is required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Enter a valid email'
  errors.password = form.password.length >= 8 ? '' : 'Password must be at least 8 characters'
  errors.confirmPassword = form.confirmPassword === form.password ? '' : 'Passwords do not match'
  return !errors.name && !errors.email && !errors.password && !errors.confirmPassword
}

function handleRegister() {
  if (!validate()) return
  // TODO: wire up registration API
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen bg-[#0a0a0f]">
    <!-- Left panel — brand -->
    <div
      class="relative hidden md:flex flex-1 flex-col items-center justify-center overflow-hidden px-14 py-10"
      style="background: linear-gradient(160deg, #3d1de0 0%, #2510a8 45%, #110866 100%)"
    >
      <!-- Decorative orbs -->
      <div
        class="absolute rounded-full pointer-events-none blur-[72px] w-[420px] h-[420px] bg-violet-500/45 -top-[120px] -right-[80px]"
      />
      <div
        class="absolute rounded-full pointer-events-none blur-[72px] w-[320px] h-[320px] bg-blue-500/25 -bottom-[60px] -left-[60px]"
      />
      <div
        class="absolute rounded-full pointer-events-none blur-[72px] w-[200px] h-[200px] bg-pink-500/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <!-- Dot grid -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 28px 28px"
      />

      <!-- Logo — top-left -->
      <div class="absolute top-9 left-12 flex items-center gap-2.5 z-10">
        <div
          class="w-9 h-9 rounded-[9px] bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm"
        >
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 4a8 8 0 0 1 7.938 6.938C26.097 17.367 23.212 16 20 16s-6.097 1.367-7.938 2.938A8 8 0 0 1 20 12zm0 16a8 8 0 0 1-7.938-6.938C13.903 22.633 16.788 24 20 24s6.097-1.367 7.938-2.938A8 8 0 0 1 20 28z"
              fill="white"
            />
          </svg>
        </div>
        <span class="text-[18px] font-bold text-white tracking-tight">StripeDesk</span>
      </div>

      <!-- Hero content — centered -->
      <div class="relative z-10 text-center max-w-[420px]">
        <div
          class="inline-block text-[11px] font-semibold tracking-[2px] uppercase text-white/50 bg-white/[0.08] border border-white/[0.12] rounded-full px-3.5 py-1 mb-7"
        >
          Commerce Platform
        </div>
        <h2
          class="text-[44px] font-extrabold text-white leading-[1.12] tracking-[-1.5px] mb-[18px]"
        >
          Get started<br />
          <span class="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            in seconds.
          </span>
        </h2>
        <p class="text-base text-white/60 leading-relaxed mb-9">
          Create your account and start managing<br />payments with ease.
        </p>

        <!-- Steps -->
        <div class="flex flex-col gap-3 text-left">
          <div
            class="flex items-center gap-3 bg-white/[0.06] border border-white/[0.10] backdrop-blur-md rounded-xl px-4 py-3"
          >
            <div
              class="w-7 h-7 rounded-full bg-[#6c47ff] flex items-center justify-center text-white text-[12px] font-bold shrink-0"
            >
              1
            </div>
            <span class="text-[13px] text-white/75">Create your account</span>
          </div>
          <div
            class="flex items-center gap-3 bg-white/[0.06] border border-white/[0.10] backdrop-blur-md rounded-xl px-4 py-3"
          >
            <div
              class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-[12px] font-bold shrink-0"
            >
              2
            </div>
            <span class="text-[13px] text-white/45">Connect your Stripe account</span>
          </div>
          <div
            class="flex items-center gap-3 bg-white/[0.06] border border-white/[0.10] backdrop-blur-md rounded-xl px-4 py-3"
          >
            <div
              class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-[12px] font-bold shrink-0"
            >
              3
            </div>
            <span class="text-[13px] text-white/45">Manage everything from your dashboard</span>
          </div>
        </div>
      </div>

      <!-- Stats bar — pinned bottom -->
      <div class="absolute bottom-9 inset-x-0 flex items-center justify-center z-10">
        <div class="flex flex-col items-center px-8">
          <span class="text-[20px] font-bold text-white tracking-[-0.5px] leading-none mb-1">Free</span>
          <span class="text-[11px] font-medium tracking-[0.5px] text-white/45 uppercase">To start</span>
        </div>
        <div class="w-px h-8 bg-white/15" />
        <div class="flex flex-col items-center px-8">
          <span class="text-[20px] font-bold text-white tracking-[-0.5px] leading-none mb-1">2 min</span>
          <span class="text-[11px] font-medium tracking-[0.5px] text-white/45 uppercase">Setup</span>
        </div>
        <div class="w-px h-8 bg-white/15" />
        <div class="flex flex-col items-center px-8">
          <span class="text-[20px] font-bold text-white tracking-[-0.5px] leading-none mb-1">PCI</span>
          <span class="text-[11px] font-medium tracking-[0.5px] text-white/45 uppercase">Compliant</span>
        </div>
      </div>
    </div>

    <!-- Right panel — form -->
    <div
      class="w-full md:w-[480px] shrink-0 flex items-center justify-center px-6 py-12 md:px-10 bg-[#0f0f18]"
    >
      <div class="w-full max-w-[380px]">
        <!-- Mobile logo -->
        <div class="flex items-center gap-2.5 mb-8 md:hidden">
          <div class="w-8 h-8 rounded-[8px] bg-[#6c47ff] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 4a8 8 0 0 1 7.938 6.938C26.097 17.367 23.212 16 20 16s-6.097 1.367-7.938 2.938A8 8 0 0 1 20 12zm0 16a8 8 0 0 1-7.938-6.938C13.903 22.633 16.788 24 20 24s6.097-1.367 7.938-2.938A8 8 0 0 1 20 28z"
                fill="white"
              />
            </svg>
          </div>
          <span class="text-[18px] font-bold text-white tracking-tight">StripeDesk</span>
        </div>

        <div class="mb-8">
          <h1 class="text-[30px] font-bold text-[#f0f0ff] tracking-[-0.5px] mb-1.5">
            Create an account
          </h1>
          <p class="text-[15px] text-[#6b6b8a]">Start managing payments today</p>
        </div>

        <form @submit.prevent="handleRegister" novalidate>
          <!-- Full name -->
          <div class="mb-5">
            <label class="field-label">Full name</label>
            <div class="input-wrapper">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
              <input
                v-model="form.name"
                type="text"
                placeholder="Jane Smith"
                autocomplete="name"
                class="field-input"
                :class="{ 'field-input--error': errors.name }"
              />
            </div>
            <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="mb-5">
            <label class="field-label">Email address</label>
            <div class="input-wrapper">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                class="field-input"
                :class="{ 'field-input--error': errors.email }"
              />
            </div>
            <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="mb-5">
            <label class="field-label">Password</label>
            <div class="input-wrapper">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="new-password"
                class="field-input pr-11"
                :class="{ 'field-input--error': errors.password }"
              />
              <button type="button" @click="showPassword = !showPassword" class="eye-toggle">
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
          </div>

          <!-- Confirm password -->
          <div class="mb-7">
            <label class="field-label">Confirm password</label>
            <div class="input-wrapper">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="new-password"
                class="field-input pr-11"
                :class="{ 'field-input--error': errors.confirmPassword }"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="eye-toggle"
              >
                <svg
                  v-if="!showConfirmPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</p>
          </div>

          <button type="submit" class="submit-btn">Create account</button>
        </form>

        <p class="mt-6 text-center text-[14px] text-[#6b6b8a]">
          Already have an account?
          <router-link to="/login" class="text-[#6c47ff] hover:underline font-medium">
            Sign in
          </router-link>
        </p>

        <p class="mt-7 text-center text-[13px] text-[#4a4a6a]">
          Secure access powered by
          <a
            href="https://stripe.com"
            target="_blank"
            rel="noopener"
            class="text-[#6c47ff] hover:underline"
            >Stripe</a
          >
          &amp; JWT
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field-label {
  display: block;
  color: #a0a0c0;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2px;
  margin-bottom: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #4a4a6a;
  pointer-events: none;
  flex-shrink: 0;
}

.field-input {
  width: 100%;
  height: 44px;
  background: #1a1a2e;
  border: 1px solid #2a2a45;
  border-radius: 10px;
  color: #e0e0f0;
  font-size: 15px;
  padding: 0 14px 0 40px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.field-input::placeholder {
  color: #4a4a6a;
}

.field-input:hover {
  border-color: #6c47ff;
}

.field-input:focus {
  border-color: #6c47ff;
  box-shadow: 0 0 0 3px rgba(108, 71, 255, 0.2);
}

.field-input--error {
  border-color: #f87171 !important;
}

.field-input--error:focus {
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2) !important;
}

.field-error {
  margin-top: 5px;
  font-size: 12px;
  color: #f87171;
}

.eye-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a4a6a;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.eye-toggle:hover {
  color: #a0a0c0;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6c47ff, #4f2de0);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(108, 71, 255, 0.45);
  transition:
    opacity 0.2s,
    box-shadow 0.2s;
}

.submit-btn:hover {
  opacity: 0.9;
  box-shadow: 0 6px 28px rgba(108, 71, 255, 0.6);
}
</style>
