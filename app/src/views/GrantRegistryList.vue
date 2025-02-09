<template>
  <div class="max-w-screen-lg mx-auto">
    <!-- Create New Grant -->
    <div class="mb-10">
      <h1 class="text-lg mb-3">Create New Grant</h1>
      <div class="mb-1">Click the button below to create a new grant</div>
      <button @click="pushRoute({ name: 'dgrants-new' })" class="btn btn-secondary">Create Grant</button>
    </div>

    <!-- View Existing Grants -->
    <h1 class="text-lg mb-3">Grant Registry List</h1>
    <div class="mb-1">Below is all grants read from the GrantRegistry contract</div>
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="grant in grants"
        :key="grant.id"
        @click="pushRoute({ name: 'dgrants-id', params: { id: grant.id } })"
        class="
          col-span-1
          bg-white
          rounded-lg
          shadow
          divide-y divide-gray-400 divide-opacity-30
          cursor-pointer
          border border-gray-200
          hover:border-primary-500
        "
      >
        <div class="w-full flex items-center justify-between p-6 space-x-6 hover:border">
          <div class="flex-1 truncate text-left">
            <div class="flex items-center space-x-3">
              <h3 class="text-gray-900 text-sm font-medium truncate">Grant ID: {{ grant.id.toString() }}</h3>
            </div>
            <p class="mt-1 text-gray-500 text-sm truncate">{{ grant.metaPtr }}</p>
          </div>
        </div>
        <div>
          <div class="pl-6 p-2 -mt-px flex divide-x divide-gray-400 divide-opacity-30">
            <div class="w-0 flex-1 flex">
              <div class="flex-1 truncate text-left">
                <p class="mt-1 text-gray-500 text-sm truncate">Owner</p>
                <div class="flex items-center space-x-3">
                  <h3 class="text-gray-900 text-sm font-medium">{{ formatAddress(grant.owner) }}</h3>
                </div>
              </div>
            </div>
            <div class="pl-6 -ml-px w-0 flex-1 flex">
              <div class="w-0 flex-1 flex">
                <div class="flex-1 truncate text-left">
                  <p class="mt-1 text-gray-500 text-sm truncate">Payee</p>
                  <div class="flex items-center space-x-3">
                    <h3 class="text-gray-900 text-sm font-medium">{{ formatAddress(grant.payee) }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formatAddress, pushRoute } from 'src/utils/utils';
import useDataStore from 'src/store/data';

export default defineComponent({
  name: 'GrantRegistryList',
  setup() {
    const { grants } = useDataStore();
    return { formatAddress, pushRoute, grants };
  },
});
</script>
