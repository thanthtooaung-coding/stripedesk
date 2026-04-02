/// <reference types="vite/client" />

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresRole?: "admin";
    public?: boolean;
  }
}
