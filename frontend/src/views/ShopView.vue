<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  cadence: string;
  highlight?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Starter",
    description: "For small teams shipping their first paid workflows.",
    price: "$19",
    cadence: "per month",
  },
  {
    id: 2,
    name: "Growth",
    description: "Advanced automations, invoicing tools, and reporting.",
    price: "$79",
    cadence: "per month",
    highlight: true,
  },
  {
    id: 3,
    name: "Enterprise",
    description: "Custom limits, admin controls, and premium onboarding.",
    price: "Custom",
    cadence: "contact sales",
  },
];
</script>

<template>
  <section class="space-y-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-slate-500">Shop</p>
        <h1 class="mt-2 text-3xl font-semibold text-white">Product catalog</h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          This keeps the source app's dedicated shop area, but swaps Ant Design cards for a Tailwind
          product grid ready for real pricing data.
        </p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
        Checkout flow placeholder
      </div>
    </div>

    <div class="grid gap-5 lg:grid-cols-3">
      <article
        v-for="product in products"
        :key="product.id"
        class="relative overflow-hidden rounded-[28px] border p-6"
        :class="
          product.highlight
            ? 'border-indigo-400/40 bg-indigo-500/10 shadow-lg shadow-indigo-950/30'
            : 'border-white/10 bg-white/5'
        "
      >
        <div
          v-if="product.highlight"
          class="absolute right-4 top-4 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-indigo-200"
        >
          Popular
        </div>

        <p class="text-sm text-slate-400">{{ product.name }}</p>
        <p class="mt-4 text-4xl font-semibold text-white">{{ product.price }}</p>
        <p class="mt-1 text-sm text-slate-400">{{ product.cadence }}</p>
        <p class="mt-5 text-sm leading-6 text-slate-300">{{ product.description }}</p>

        <ul class="mt-6 space-y-2 text-sm text-slate-300">
          <li>Stripe Checkout integration point</li>
          <li>Product and currency metadata slot</li>
          <li>Purchase confirmation routes preserved</li>
        </ul>

        <button
          type="button"
          class="mt-8 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-slate-900"
        >
          Start checkout
        </button>
      </article>
    </div>
  </section>
</template>
