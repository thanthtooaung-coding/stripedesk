<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AuthLayout from "@/components/auth/AuthLayout.vue";
import FormTextInput from "@/components/common/form-input/FormTextInput.vue";
import AppButton from "@/components/ui/AppButton.vue";
import AuthFormHeader from "@/components/ui/AuthFormHeader.vue";
import AuthSwitchLink from "@/components/ui/AuthSwitchLink.vue";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = reactive({ email: "", password: "" });
const destination = computed(() =>
  typeof route.query.redirect === "string" ? route.query.redirect : auth.role === "admin" ? "/admin" : "/dashboard",
);

async function handleLogin() {
  const ok = await auth.login(form.email, form.password);
  if (ok) {
    await router.push(destination.value);
  }
}
</script>

<template>
  <AuthLayout>
    <!-- Brand hero content -->
    <template #brand-hero>
      <div
        class="inline-block text-[11px] font-semibold tracking-[2px] uppercase text-white/50 bg-white/8 border border-white/12 rounded-full px-3.5 py-1 mb-7"
      >
        Commerce Platform
      </div>
      <h2 class="text-[44px] font-extrabold text-white leading-[1.12] tracking-[-1.5px] mb-[18px]">
        Built for speed.<br />
        <span class="bg-linear-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
          Payments made simple.
        </span>
      </h2>
      <p class="text-base text-white/60 leading-relaxed mb-9">
        Manage products, subscriptions, and invoices<br />in one elegant dashboard.
      </p>

      <div class="flex flex-wrap justify-center gap-2.5">
        <div
          class="inline-flex items-center gap-2 bg-white/8 border border-white/14 backdrop-blur-md rounded-full px-4 py-[7px] text-[13px] font-medium text-white/85"
        >
          <span
            class="w-[7px] h-[7px] rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0"
          />
          Stripe Checkout
        </div>
        <div
          class="inline-flex items-center gap-2 bg-white/8 border border-white/14 backdrop-blur-md rounded-full px-4 py-[7px] text-[13px] font-medium text-white/85"
        >
          <span
            class="w-[7px] h-[7px] rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] shrink-0"
          />
          JWT Auth
        </div>
        <div
          class="inline-flex items-center gap-2 bg-white/8 border border-white/14 backdrop-blur-md rounded-full px-4 py-[7px] text-[13px] font-medium text-white/85"
        >
          <span
            class="w-[7px] h-[7px] rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] shrink-0"
          />
          Role-based
        </div>
      </div>
    </template>

    <!-- Brand stats -->
    <template #brand-stats>
      <div class="flex flex-col items-center px-8">
        <span class="text-[20px] font-bold text-white tracking-[-0.5px] leading-none mb-1">
          99.9%
        </span>
        <span class="text-[11px] font-medium tracking-[0.5px] text-white/45 uppercase">
          Uptime
        </span>
      </div>
      <div class="w-px h-8 bg-white/15" />
      <div class="flex flex-col items-center px-8">
        <span class="text-[20px] font-bold text-white tracking-[-0.5px] leading-none mb-1">
          256-bit
        </span>
        <span class="text-[11px] font-medium tracking-[0.5px] text-white/45 uppercase">
          Encryption
        </span>
      </div>
      <div class="w-px h-8 bg-white/15" />
      <div class="flex flex-col items-center px-8">
        <span class="text-[20px] font-bold text-white tracking-[-0.5px] leading-none mb-1">
          PCI
        </span>
        <span class="text-[11px] font-medium tracking-[0.5px] text-white/45 uppercase">
          Compliant
        </span>
      </div>
    </template>

    <AuthFormHeader title="Welcome back" subtitle="Sign in to your account" />

    <!-- Error alert -->
    <div
      v-if="auth.error"
      class="flex items-start gap-3 mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0 mt-0.5"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span class="flex-1">{{ auth.error }}</span>
      <button
        type="button"
        @click="auth.error = null"
        class="text-red-400/60 hover:text-red-400 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="handleLogin" novalidate>
      <div class="mb-5">
        <FormTextInput
          v-model="form.email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          autocomplete="email"
        >
          <template #icon>
            <svg
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
          </template>
        </FormTextInput>
      </div>

      <div class="mb-7">
        <FormTextInput
          v-model="form.password"
          type="password"
          label="Password"
          placeholder="••••••••"
          autocomplete="current-password"
        >
          <template #icon>
            <svg
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
          </template>
        </FormTextInput>

        <div class="mt-3 text-right">
          <router-link to="/forgot-password" class="text-sm font-medium text-[#8b72ff] hover:underline">
            Forgot password?
          </router-link>
        </div>
      </div>

      <AppButton type="submit" :loading="auth.loading">
        {{ auth.loading ? "Signing in\u2026" : "Sign in" }}
      </AppButton>
    </form>

    <AuthSwitchLink prompt="Don't have an account?" to="/register" link-label="Create one" />

    <p class="mt-7 text-center text-[13px] text-[#4a4a6a]">
      Secure access powered by
      <a
        href="https://stripe.com"
        target="_blank"
        rel="noopener"
        class="text-[#6c47ff] hover:underline"
      >
        Stripe
      </a>
      &amp; JWT
    </p>
  </AuthLayout>
</template>
