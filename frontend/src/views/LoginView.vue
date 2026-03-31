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
      <!-- Decorative orbs -->
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
      <!-- Dot grid -->
      <div class="dot-grid" />

      <!-- Logo pinned top-left -->
      <div class="brand-logo">
        <div class="brand-logo-icon">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 4a8 8 0 0 1 7.938 6.938C26.097 17.367 23.212 16 20 16s-6.097 1.367-7.938 2.938A8 8 0 0 1 20 12zm0 16a8 8 0 0 1-7.938-6.938C13.903 22.633 16.788 24 20 24s6.097-1.367 7.938-2.938A8 8 0 0 1 20 28z"
              fill="white"
            />
          </svg>
        </div>
        <span class="brand-name">StripeDesk</span>
      </div>

      <!-- Centered hero content -->
      <div class="brand-hero">
        <div class="brand-eyebrow">Commerce Platform</div>
        <h2 class="brand-tagline">
          Built for speed.<br />
          <span class="brand-tagline-accent">Payments made simple.</span>
        </h2>
        <p class="brand-sub">
          Manage products, subscriptions, and invoices<br />in one elegant dashboard.
        </p>

        <!-- Feature badges — horizontal -->
        <div class="brand-badges">
          <div class="badge">
            <span class="badge-dot green" />
            Stripe Checkout
          </div>
          <div class="badge">
            <span class="badge-dot blue" />
            JWT Auth
          </div>
          <div class="badge">
            <span class="badge-dot purple" />
            Role-based
          </div>
        </div>
      </div>

      <!-- Stats bar pinned bottom -->
      <div class="brand-stats">
        <div class="stat">
          <span class="stat-num">99.9%</span>
          <span class="stat-label">Uptime</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-num">256-bit</span>
          <span class="stat-label">Encryption</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-num">PCI</span>
          <span class="stat-label">Compliant</span>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #3d1de0 0%, #2510a8 45%, #110866 100%);
  padding: 40px 56px;
  position: relative;
  overflow: hidden;
}

/* Decorative glowing orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  pointer-events: none;
}
.orb-1 {
  width: 420px;
  height: 420px;
  background: rgba(139, 92, 246, 0.45);
  top: -120px;
  right: -80px;
}
.orb-2 {
  width: 320px;
  height: 320px;
  background: rgba(59, 130, 246, 0.25);
  bottom: -60px;
  left: -60px;
}
.orb-3 {
  width: 200px;
  height: 200px;
  background: rgba(236, 72, 153, 0.15);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Subtle dot-grid texture */
.dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

/* Logo — top-left pinned */
.brand-logo {
  position: absolute;
  top: 36px;
  left: 48px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 2;
}

.brand-logo-icon {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.2px;
}

/* Hero content — vertically centered */
.brand-hero {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 420px;
}

.brand-eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  padding: 5px 14px;
  margin-bottom: 28px;
}

.brand-tagline {
  font-size: 44px;
  font-weight: 800;
  color: #fff;
  line-height: 1.12;
  letter-spacing: -1.5px;
  margin: 0 0 18px;
}

.brand-tagline-accent {
  background: linear-gradient(90deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-sub {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.65;
  margin: 0 0 36px;
}

/* Badges — horizontal row */
.brand-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  border-radius: 100px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.badge-dot.green  { background: #34d399; box-shadow: 0 0 8px #34d399; }
.badge-dot.blue   { background: #60a5fa; box-shadow: 0 0 8px #60a5fa; }
.badge-dot.purple { background: #c084fc; box-shadow: 0 0 8px #c084fc; }

/* Stats bar — pinned bottom */
.brand-stats {
  position: absolute;
  bottom: 36px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  z-index: 2;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px;
}

.stat-num {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.15);
}

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
