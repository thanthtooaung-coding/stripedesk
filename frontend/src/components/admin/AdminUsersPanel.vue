<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { Loader2, Plus, Trash2, Users } from "@lucide/vue";
import { toast } from "@/lib/toast";
import { adminService } from "@/services/admin.service";
import { getApiErrorMessage } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth";
import type { AdminUser } from "@/type/admin.type";
import { useDebouncedRef } from "@/utils/debounce";

const auth = useAuthStore();
const items = ref<AdminUser[]>([]);
const loading = ref(true);
const saving = ref(false);
const limit = ref(200);
const { source: search, debounced: searchDebounced } = useDebouncedRef("", 300);

const form = reactive({ name: "", email: "", password: "" });

const filtered = computed(() => {
  const q = searchDebounced.value.trim().toLowerCase();
  if (!q) return items.value;
  return items.value.filter(
    (r) =>
      String(r.name).toLowerCase().includes(q) ||
      String(r.email).toLowerCase().includes(q) ||
      String(r.role).toLowerCase().includes(q),
  );
});

async function load() {
  loading.value = true;
  try {
    items.value = await adminService.listUsers(limit.value);
  } catch (e) {
    toast.error(getApiErrorMessage(e, "Failed to load users."));
  } finally {
    loading.value = false;
  }
}

async function submitCreate() {
  if (!form.name.trim() || !form.email.trim() || !form.password) {
    toast.error("Name, email, and password are required.");
    return;
  }
  saving.value = true;
  try {
    await adminService.createAdminUser({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    toast.success("Admin created. They must verify OTP (intent: account_activation).");
    form.name = "";
    form.email = "";
    form.password = "";
    await load();
  } catch (e) {
    toast.error(getApiErrorMessage(e, "Create failed."));
  } finally {
    saving.value = false;
  }
}

function confirmDelete(row: AdminUser) {
  if (row.id === auth.user?.id) return;
  if (!confirm(`Soft-delete ${row.email}? They will not be able to sign in.`)) return;
  void (async () => {
    try {
      await adminService.deleteUser(row.id);
      toast.success("User removed.");
      await load();
    } catch (e) {
      toast.error(getApiErrorMessage(e, "Delete failed."));
    }
  })();
}

onMounted(load);
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2 text-slate-400">
        <Users class="h-5 w-5 text-indigo-300/80" />
        <span class="text-sm">Active directory</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <select
          v-model.number="limit"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white"
          @change="load"
        >
          <option :value="50">50 rows</option>
          <option :value="100">100 rows</option>
          <option :value="200">200 rows</option>
          <option :value="500">500 rows</option>
        </select>
        <input
          v-model="search"
          type="search"
          placeholder="Search…"
          class="w-48 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
        />
      </div>
    </div>

    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Create admin</p>
      <form class="mt-4 grid gap-4 md:grid-cols-3" @submit.prevent="submitCreate">
        <input
          v-model="form.name"
          placeholder="Name"
          autocomplete="name"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          autocomplete="new-password"
          class="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
        />
        <div class="md:col-span-3">
          <button
            type="submit"
            :disabled="saving"
            class="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:opacity-50"
          >
            <Plus v-if="!saving" class="h-4 w-4" />
            <Loader2 v-else class="h-4 w-4 animate-spin" />
            Create admin
          </button>
        </div>
      </form>
    </div>

    <div class="overflow-hidden rounded-2xl border border-white/10">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[640px] text-left text-sm">
          <thead class="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th class="px-4 py-3 font-medium">ID</th>
              <th class="px-4 py-3 font-medium">Name</th>
              <th class="px-4 py-3 font-medium">Email</th>
              <th class="px-4 py-3 font-medium">Role</th>
              <th class="px-4 py-3 font-medium">Created</th>
              <th class="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-if="loading">
              <td colspan="6" class="px-4 py-12 text-center text-slate-500">
                <Loader2 class="mx-auto h-8 w-8 animate-spin text-indigo-400/60" />
              </td>
            </tr>
            <tr v-else-if="!filtered.length">
              <td colspan="6" class="px-4 py-8 text-center text-slate-500">No users found.</td>
            </tr>
            <tr
              v-for="row in filtered"
              v-else
              :key="row.id"
              class="transition hover:bg-white/[0.02]"
            >
              <td class="px-4 py-3 font-mono text-slate-400">{{ row.id }}</td>
              <td class="px-4 py-3 font-medium text-white">{{ row.name }}</td>
              <td class="px-4 py-3 text-slate-300">{{ row.email }}</td>
              <td class="px-4 py-3">
                <span
                  class="rounded-full border px-2 py-0.5 text-xs uppercase tracking-wide"
                  :class="
                    row.role === 'admin'
                      ? 'border-indigo-400/40 bg-indigo-500/15 text-indigo-200'
                      : 'border-white/10 bg-white/5 text-slate-300'
                  "
                >
                  {{ row.role }}
                </span>
              </td>
              <td class="px-4 py-3 text-slate-400">{{ row.created_at }}</td>
              <td class="px-4 py-3 text-right">
                <button
                  type="button"
                  :disabled="row.id === auth.user?.id"
                  class="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-2 py-1 text-xs text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                  @click="confirmDelete(row)"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
