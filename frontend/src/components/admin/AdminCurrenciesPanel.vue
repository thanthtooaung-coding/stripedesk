<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { Coins, Loader2, Pencil, Plus } from "@lucide/vue";
import { toast } from "@/lib/toast";
import { adminService } from "@/services/admin.service";
import { getApiErrorMessage } from "@/services/auth.service";
import type { AdminCurrency } from "@/type/admin.type";
import { useDebouncedRef } from "@/utils/debounce";

const items = ref<AdminCurrency[]>([]);
const loading = ref(true);
const saving = ref(false);
const { source: search, debounced: searchDebounced } = useDebouncedRef("", 300);

const form = reactive({
  code: "",
  numeric_code: "",
  name: "",
  minor_unit: 2,
  symbol: "",
  is_default: false,
});

const editOpen = ref(false);
const editId = ref<number | null>(null);
const editForm = reactive({
  code: "",
  numeric_code: "",
  name: "",
  minor_unit: 2,
  symbol: "",
  is_default: false,
});

const filtered = computed(() => {
  const q = searchDebounced.value.trim().toLowerCase();
  if (!q) return items.value;
  return items.value.filter((r) => {
    const blob = [r.code, r.name, r.symbol, r.numeric_code].map((x) => String(x ?? "")).join(" ");
    return blob.toLowerCase().includes(q);
  });
});

function normalizeCode() {
  if (form.code) form.code = form.code.trim().toUpperCase();
}

async function load() {
  loading.value = true;
  try {
    items.value = await adminService.listCurrencies();
  } catch (e) {
    toast.error(getApiErrorMessage(e, "Failed to load currencies."));
  } finally {
    loading.value = false;
  }
}

async function submitCreate() {
  normalizeCode();
  if (form.code.length !== 3 || !form.name.trim()) {
    toast.error("3-letter code and name are required.");
    return;
  }
  saving.value = true;
  try {
    await adminService.createCurrency({
      code: form.code,
      numeric_code: form.numeric_code.trim() || null,
      name: form.name.trim(),
      minor_unit: form.minor_unit,
      symbol: form.symbol.trim() || null,
      is_default: form.is_default,
    });
    toast.success("Currency created.");
    form.code = "";
    form.numeric_code = "";
    form.name = "";
    form.minor_unit = 2;
    form.symbol = "";
    form.is_default = false;
    await load();
  } catch (e) {
    toast.error(getApiErrorMessage(e, "Create failed."));
  } finally {
    saving.value = false;
  }
}

function openEdit(row: AdminCurrency) {
  editId.value = row.id;
  editForm.code = row.code;
  editForm.numeric_code = row.numeric_code ?? "";
  editForm.name = row.name ?? "";
  editForm.minor_unit = row.minor_unit ?? 2;
  editForm.symbol = row.symbol ?? "";
  editForm.is_default = !!row.is_default;
  editOpen.value = true;
}

function closeEdit() {
  editOpen.value = false;
  editId.value = null;
}

async function saveEdit() {
  if (editId.value == null) return;
  saving.value = true;
  try {
    await adminService.updateCurrency(editId.value, {
      name: editForm.name.trim(),
      numeric_code: editForm.numeric_code.trim() || null,
      minor_unit: editForm.minor_unit,
      symbol: editForm.symbol.trim() || null,
      is_default: editForm.is_default,
    });
    toast.success("Currency updated.");
    closeEdit();
    await load();
  } catch (e) {
    toast.error(getApiErrorMessage(e, "Update failed."));
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2 text-slate-400">
        <Coins class="h-5 w-5 text-indigo-300/80" />
        <span class="text-sm">Markets</span>
      </div>
      <input
        v-model="search"
        type="search"
        placeholder="Search…"
        class="w-48 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
      />
    </div>

    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Create currency</p>
      <form class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3" @submit.prevent="submitCreate">
        <input
          v-model="form.code"
          maxlength="3"
          placeholder="Code (ISO 4217)"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm uppercase text-white placeholder:normal-case placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
          @blur="normalizeCode"
        />
        <input
          v-model="form.numeric_code"
          placeholder="Numeric code"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
        />
        <input
          v-model="form.name"
          placeholder="Name"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
        />
        <input
          v-model.number="form.minor_unit"
          type="number"
          min="0"
          max="6"
          placeholder="Minor units"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white focus:border-indigo-400/50 focus:outline-none"
        />
        <input
          v-model="form.symbol"
          placeholder="Symbol"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
        />
        <label class="flex items-center gap-2 text-sm text-slate-300">
          <input
            v-model="form.is_default"
            type="checkbox"
            class="rounded border-white/20 bg-slate-950 text-indigo-500"
          />
          Default currency
        </label>
        <div class="md:col-span-2 lg:col-span-3">
          <button
            type="submit"
            :disabled="saving"
            class="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:opacity-50"
          >
            <Plus v-if="!saving" class="h-4 w-4" />
            <Loader2 v-else class="h-4 w-4 animate-spin" />
            Create currency
          </button>
        </div>
      </form>
    </div>

    <div class="overflow-hidden rounded-2xl border border-white/10">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[720px] text-left text-sm">
          <thead class="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th class="px-4 py-3 font-medium">Code</th>
              <th class="px-4 py-3 font-medium">Name</th>
              <th class="px-4 py-3 font-medium">Numeric</th>
              <th class="px-4 py-3 font-medium">Symbol</th>
              <th class="px-4 py-3 font-medium">Minor</th>
              <th class="px-4 py-3 font-medium">Default</th>
              <th class="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-if="loading">
              <td colspan="7" class="px-4 py-12 text-center text-slate-500">
                <Loader2 class="mx-auto h-8 w-8 animate-spin text-indigo-400/60" />
              </td>
            </tr>
            <tr v-else-if="!filtered.length">
              <td colspan="7" class="px-4 py-8 text-center text-slate-500">No currencies.</td>
            </tr>
            <tr
              v-for="row in filtered"
              v-else
              :key="row.id"
              class="transition hover:bg-white/[0.02]"
            >
              <td class="px-4 py-3 font-mono font-medium text-white">{{ row.code }}</td>
              <td class="px-4 py-3 text-slate-200">{{ row.name }}</td>
              <td class="px-4 py-3 text-slate-500">{{ row.numeric_code ?? "—" }}</td>
              <td class="px-4 py-3 text-slate-400">{{ row.symbol ?? "—" }}</td>
              <td class="px-4 py-3 text-slate-500">{{ row.minor_unit }}</td>
              <td class="px-4 py-3">
                <span
                  v-if="row.is_default"
                  class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-200"
                >
                  Default
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <button
                  type="button"
                  class="inline-flex items-center gap-1 rounded-lg border border-white/15 px-2 py-1 text-xs text-slate-200 transition hover:bg-white/10"
                  @click="openEdit(row)"
                >
                  <Pencil class="h-3.5 w-3.5" />
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="editOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="closeEdit"
      >
        <div
          class="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-indigo-950/40"
        >
          <h3 class="text-lg font-semibold text-white">Edit currency</h3>
          <p class="mt-1 text-xs text-slate-500">Code is read-only per API.</p>
          <div class="mt-4 space-y-3">
            <input
              :value="editForm.code"
              disabled
              class="w-full cursor-not-allowed rounded-xl border border-white/5 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-500"
            />
            <input
              v-model="editForm.name"
              placeholder="Name"
              class="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white focus:border-indigo-400/50 focus:outline-none"
            />
            <input
              v-model="editForm.numeric_code"
              placeholder="Numeric code"
              class="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white focus:border-indigo-400/50 focus:outline-none"
            />
            <input
              v-model="editForm.symbol"
              placeholder="Symbol"
              class="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white focus:border-indigo-400/50 focus:outline-none"
            />
            <input
              v-model.number="editForm.minor_unit"
              type="number"
              min="0"
              max="6"
              class="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white focus:border-indigo-400/50 focus:outline-none"
            />
            <label class="flex items-center gap-2 text-sm text-slate-300">
              <input
                v-model="editForm.is_default"
                type="checkbox"
                class="rounded border-white/20 bg-slate-950 text-indigo-500"
              />
              Default currency
            </label>
          </div>
          <div class="mt-6 flex justify-end gap-2">
            <button
              type="button"
              class="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
              @click="closeEdit"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="saving"
              class="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-50"
              @click="saveEdit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
