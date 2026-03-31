<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({ email: '', password: '' })

async function handleLogin() {
  const ok = await auth.login(form.email, form.password)
  if (ok) router.push('/dashboard')
}
</script>

<template>
  <div class="login-root">
    <!-- Left panel — brand -->
    <div class="brand-panel">
      <div class="brand-inner">
        <div class="brand-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="white" fill-opacity="0.15" />
            <path
              d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 4a8 8 0 0 1 7.938 6.938C26.097 17.367 23.212 16 20 16s-6.097 1.367-7.938 2.938A8 8 0 0 1 20 12zm0 16a8 8 0 0 1-7.938-6.938C13.903 22.633 16.788 24 20 24s6.097-1.367 7.938-2.938A8 8 0 0 1 20 28z"
              fill="white"
            />
          </svg>
          <span class="brand-name">StripeDesk</span>
        </div>
        <h2 class="brand-tagline">Commerce portal<br />built for speed.</h2>
        <p class="brand-sub">
          Manage products, subscriptions, and payments in one elegant dashboard.
        </p>
        <div class="brand-badges">
          <div class="badge"><span class="badge-dot green" />Stripe Checkout</div>
          <div class="badge"><span class="badge-dot blue" />JWT Auth</div>
          <div class="badge"><span class="badge-dot purple" />Role-based access</div>
        </div>
      </div>
    </div>

    <!-- Right panel — form -->
    <div class="form-panel">
      <div class="form-card">
        <div class="form-header">
          <h1 class="form-title">Welcome back</h1>
          <p class="form-subtitle">Sign in to your account</p>
        </div>

        <a-alert
          v-if="auth.error"
          :message="auth.error"
          type="error"
          show-icon
          closable
          class="form-alert"
          @close="auth.error = null"
        />

        <a-form layout="vertical" @finish="handleLogin">
          <a-form-item
            label="Email address"
            name="email"
            :rules="[{ required: true, type: 'email', message: 'Enter a valid email' }]"
          >
            <a-input
              v-model:value="form.email"
              size="large"
              placeholder="you@example.com"
              autocomplete="email"
            >
              <template #prefix>
                <mail-outlined class="input-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Password is required' }]"
          >
            <a-input-password
              v-model:value="form.password"
              size="large"
              placeholder="••••••••"
              autocomplete="current-password"
            >
              <template #prefix>
                <lock-outlined class="input-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="auth.loading"
            class="submit-btn"
          >
            {{ auth.loading ? 'Signing in…' : 'Sign in' }}
          </a-button>
        </a-form>

        <p class="form-footer">
          Secure access powered by
          <a href="https://stripe.com" target="_blank" rel="noopener">Stripe</a> &amp; JWT
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── Layout ────────────────────────────────────────────────────── */
.login-root {
  display: flex;
  min-height: 100vh;
  background: #0a0a0f;
}

/* ─── Brand panel ───────────────────────────────────────────────── */
.brand-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #5b2de8 0%, #3b10c4 50%, #1a0575 100%);
  padding: 48px;
  position: relative;
  overflow: hidden;
}

.brand-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 80%, rgba(120, 60, 255, 0.35) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 80% 20%, rgba(90, 200, 255, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.brand-inner {
  position: relative;
  z-index: 1;
  max-width: 440px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
}

.brand-name {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
}

.brand-tagline {
  font-size: 42px;
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -1px;
  margin: 0 0 20px;
}

.brand-sub {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0 0 40px;
}

.brand-badges {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 100px;
  padding: 8px 18px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  width: fit-content;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.badge-dot.green { background: #34d399; box-shadow: 0 0 6px #34d399; }
.badge-dot.blue  { background: #60a5fa; box-shadow: 0 0 6px #60a5fa; }
.badge-dot.purple { background: #c084fc; box-shadow: 0 0 6px #c084fc; }

/* ─── Form panel ────────────────────────────────────────────────── */
.form-panel {
  width: 480px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  background: #0f0f18;
}

.form-card {
  width: 100%;
  max-width: 380px;
}

.form-header {
  margin-bottom: 36px;
}

.form-title {
  font-size: 30px;
  font-weight: 700;
  color: #f0f0ff;
  letter-spacing: -0.5px;
  margin: 0 0 6px;
}

.form-subtitle {
  font-size: 15px;
  color: #6b6b8a;
  margin: 0;
}

.form-alert {
  margin-bottom: 24px;
}

/* ─── Ant Design overrides ──────────────────────────────────────── */
:deep(.ant-form-item-label > label) {
  color: #a0a0c0 !important;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

:deep(.ant-input-affix-wrapper),
:deep(.ant-input-password) {
  background: #1a1a2e !important;
  border: 1px solid #2a2a45 !important;
  border-radius: 10px !important;
  color: #e0e0f0 !important;
  transition: border-color 0.2s, box-shadow 0.2s;
}

:deep(.ant-input-affix-wrapper:hover),
:deep(.ant-input-password:hover) {
  border-color: #6c47ff !important;
}

:deep(.ant-input-affix-wrapper-focused),
:deep(.ant-input-password-focused) {
  border-color: #6c47ff !important;
  box-shadow: 0 0 0 3px rgba(108, 71, 255, 0.2) !important;
}

:deep(.ant-input) {
  background: transparent !important;
  color: #e0e0f0 !important;
  font-size: 15px;
}

:deep(.ant-input::placeholder) {
  color: #4a4a6a !important;
}

:deep(.ant-input-suffix .anticon),
:deep(.ant-input-prefix .anticon) {
  color: #4a4a6a !important;
}

.input-icon {
  color: #4a4a6a;
}

.submit-btn {
  margin-top: 8px;
  height: 48px !important;
  border-radius: 10px !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, #6c47ff, #4f2de0) !important;
  border: none !important;
  box-shadow: 0 4px 20px rgba(108, 71, 255, 0.45) !important;
  transition: opacity 0.2s, box-shadow 0.2s !important;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9 !important;
  box-shadow: 0 6px 28px rgba(108, 71, 255, 0.6) !important;
}

/* ─── Footer ────────────────────────────────────────────────────── */
.form-footer {
  margin-top: 28px;
  text-align: center;
  font-size: 13px;
  color: #4a4a6a;
}

.form-footer a {
  color: #6c47ff;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}

/* ─── Responsive ────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .brand-panel {
    display: none;
  }
  .form-panel {
    width: 100%;
    padding: 32px 24px;
  }
}
</style>
