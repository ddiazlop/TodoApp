<script setup lang="ts">
import { ref } from 'vue';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  toggle: [id: number];
  update: [payload: { id: number; text: string }];
  delete: [id: number];
}>();

const editing = ref(false);
const editText = ref('');

function startEdit() {
  editText.value = props.todo.text;
  editing.value = true;
}

function saveEdit() {
  const trimmed = editText.value.trim();
  if (trimmed && trimmed !== props.todo.text) {
    emit('update', { id: props.todo.id, text: trimmed });
  }
  editing.value = false;
}

function cancelEdit() {
  editing.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') saveEdit();
  if (e.key === 'Escape') cancelEdit();
}
</script>

<template>
  <li
    class="flex items-center gap-3 rounded-box border border-base-300 bg-base-100 px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
    :class="{ 'opacity-60': todo.completed }"
  >
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo.id)"
      class="checkbox checkbox-success"
    />

    <input
      v-if="editing"
      v-model="editText"
      @keydown="onKeydown"
      @blur="saveEdit"
      class="input input-sm flex-1"
      autofocus
    />
    <span
      v-else
      @dblclick="startEdit"
      class="flex-1 cursor-pointer select-none text-sm"
      :class="{ 'text-base-content/40 line-through': todo.completed }"
    >
      {{ todo.text }}
    </span>

    <button
      @click="startEdit"
      class="btn btn-ghost btn-xs"
      title="Edit"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>

    <button
      @click="emit('delete', todo.id)"
      class="btn btn-ghost btn-xs text-base-content/40 hover:bg-red-100 hover:text-red-600"
      title="Delete"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </li>
</template>
