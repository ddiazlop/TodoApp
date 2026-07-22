<script setup lang="ts">
defineProps<{
  currentFilter: 'all' | 'active' | 'completed';
}>();

const emit = defineEmits<{
  'update:currentFilter': [filter: 'all' | 'active' | 'completed'];
}>();

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
] as const;
</script>

<template>
  <div class="join flex justify-center">
    <button
      v-for="f in filters"
      :key="f.key"
      @click="emit('update:currentFilter', f.key)"
      class="join-item btn btn-sm"
      :class="{ 'btn-active': currentFilter === f.key }"
    >
      {{ f.label }}
    </button>
  </div>
</template>
