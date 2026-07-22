<script setup lang="ts">
import TodoItem from './TodoItem.vue';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

defineProps<{
  todos: Todo[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  toggle: [id: number];
  update: [payload: { id: number; text: string }];
  delete: [id: number];
}>();
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="todos.length === 0" class="py-12 text-center text-base-content/40">
      <svg class="mx-auto mb-3 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p class="text-sm">No todos here yet. Add one above!</p>
    </div>

    <ul v-else class="space-y-2">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle', $event)"
        @update="emit('update', $event)"
        @delete="emit('delete', $event)"
      />
    </ul>
  </div>
</template>
