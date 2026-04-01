<script setup lang="ts">
import { reactive } from "vue";
import FormPinInput from "@/components/common/form-input/FormPinInput.vue";
import AppButton from "@/components/ui/AppButton.vue";

interface Props {
  email?: string;
}

withDefaults(defineProps<Props>(), {
  email: "",
});

const form = reactive({ code: "" });

function maskEmail(value: string) {
  return value
    .split("")
    .map((char, index) => (index > 1 && index < value.length - 9 ? "*" : char))
    .join("");
}
</script>

<template>
  <form class="space-y-6">
    <FormPinInput v-model="form.code" label="Verification code" />

    <p v-if="email" class="text-center text-sm text-slate-400">
      Code sent to <span class="font-medium text-slate-200">{{ maskEmail(email) }}</span>
    </p>

    <AppButton type="submit">Verify code</AppButton>
  </form>

  <p class="mt-6 text-center text-sm text-slate-500">
    Need a new code?
    <button type="button" class="font-medium text-indigo-400 hover:underline">Resend OTP</button>
  </p>
</template>
