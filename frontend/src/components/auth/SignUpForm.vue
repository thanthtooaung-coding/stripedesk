<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import FormTextInput from "@/components/common/form-input/FormTextInput.vue";
import AppButton from "@/components/ui/AppButton.vue";
import { useRegisterMutation } from "@/query/auth.query";
import { getApiErrorMessage } from "@/services/auth.service";

const router = useRouter();
const registerMutation = useRegisterMutation();

const form = reactive({ name: "", email: "", password: "", confirmPassword: "" });
const errors = reactive({ name: "", email: "", password: "", confirmPassword: "" });
const submitError = ref("");

function validate() {
  submitError.value = "";
  errors.name = form.name.trim() ? "" : "Full name is required";
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : "Enter a valid email";
  errors.password = form.password.length >= 8 ? "" : "Password must be at least 8 characters";
  errors.confirmPassword = form.confirmPassword === form.password ? "" : "Passwords do not match";

  return !errors.name && !errors.email && !errors.password && !errors.confirmPassword;
}

async function handleRegister() {
  if (!validate()) return;

  try {
    await registerMutation.mutateAsync({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });

    await router.push({
      path: "/verify-otp",
      query: {
        email: form.email.trim(),
        intent: "registration",
      },
    });
  } catch (error) {
    submitError.value = getApiErrorMessage(error, "Registration failed. Please try again.");
  }
}
</script>

<template>
  <form @submit.prevent="handleRegister" novalidate>
    <div
      v-if="submitError"
      class="flex items-start gap-3 mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400"
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
      <span class="flex-1">{{ submitError }}</span>
    </div>

    <div class="mb-5">
      <FormTextInput
        v-model="form.name"
        type="text"
        label="Full name"
        placeholder="Jane Smith"
        autocomplete="name"
        :error="errors.name"
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
            <circle cx="12" cy="8" r="4" />
            <path d="M20 21a8 8 0 1 0-16 0" />
          </svg>
        </template>
      </FormTextInput>
    </div>

    <div class="mb-5">
      <FormTextInput
        v-model="form.email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        autocomplete="email"
        :error="errors.email"
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

    <div class="mb-5">
      <FormTextInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="••••••••"
        autocomplete="new-password"
        :error="errors.password"
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
    </div>

    <div class="mb-7">
      <FormTextInput
        v-model="form.confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="••••••••"
        autocomplete="new-password"
        :error="errors.confirmPassword"
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
    </div>

    <AppButton type="submit" :loading="registerMutation.isPending.value">
      {{ registerMutation.isPending.value ? "Creating account..." : "Create account" }}
    </AppButton>
  </form>
</template>
