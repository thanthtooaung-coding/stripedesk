<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

type AdminTab = "users" | "products" | "currencies" | "stripeLogs";

interface PanelItem {
  title: string;
  description: string;
}

const auth = useAuthStore();
const activeTab = ref<AdminTab>("users");

const tabs: Array<{ key: AdminTab; label: string }> = [
  { key: "users", label: "Users" },
  { key: "products", label: "Products" },
  { key: "currencies", label: "Currencies" },
  { key: "stripeLogs", label: "Stripe logs" },
];

const panelContent = computed<Record<AdminTab, PanelItem[]>>(() => ({
  users: [
    { title: "Access management", description: "Review users, roles, and invite flows." },
    { title: "Identity health", description: "Surface lockouts, verification, and session events." },
  ],
  products: [
    { title: "Catalog operations", description: "Maintain plan metadata and pricing visibility." },
    { title: "Publishing workflow", description: "Queue product edits before they reach checkout." },
  ],
  currencies: [
    { title: "Supported markets", description: "Curate enabled currencies and regional defaults." },
    { title: "Conversion guardrails", description: "Track payment method and settlement constraints." },
  ],
  stripeLogs: [
    { title: "Webhook deliveries", description: "Trace incoming Stripe events and retries." },
    { title: "Incident audit", description: "Inspect failed deliveries and remediation notes." },
  ],
}));
</script>

<template>
  <section class="space-y-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-slate-500">Admin</p>
        <h1 class="mt-2 text-3xl font-semibold text-white">Operations workspace</h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          The admin page keeps the source app's tabbed structure while replacing Ant Design tabs with a
          lightweight Tailwind control surface.
        </p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
        Signed in as {{ auth.user?.email ?? "admin@example.com" }}
      </div>
    </div>

    <div
      v-if="auth.role !== 'admin'"
      class="rounded-[28px] border border-amber-400/20 bg-amber-400/10 p-6 text-sm text-amber-100"
    >
      Admin access is required to use these controls.
    </div>

    <div v-else class="grid gap-6 xl:grid-cols-[0.32fr_0.68fr]">
      <aside class="rounded-[28px] border border-white/10 bg-slate-900/80 p-4">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="mb-2 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition last:mb-0"
          :class="
            activeTab === tab.key
              ? 'bg-indigo-500/15 text-white'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          "
          @click="activeTab = tab.key"
        >
          <span>{{ tab.label }}</span>
          <span class="text-xs uppercase tracking-[0.24em] text-slate-500">Panel</span>
        </button>
      </aside>

      <article class="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
        <p class="text-sm uppercase tracking-[0.28em] text-slate-500">{{ activeTab }}</p>
        <h2 class="mt-2 text-2xl font-semibold text-white">
          {{ tabs.find((tab) => tab.key === activeTab)?.label }}
        </h2>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div
            v-for="item in panelContent[activeTab]"
            :key="item.title"
            class="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 class="text-base font-medium text-white">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-400">{{ item.description }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
