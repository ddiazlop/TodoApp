<script setup lang="ts">
import { ref, watch } from 'vue';
import TodoForm from './TodoForm.vue';
import TodoFilter from './TodoFilter.vue';
import TodoList from './TodoList.vue';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

const props = defineProps<{ initialTodos?: Todo[] }>();

const todos = ref<Todo[]>(props.initialTodos ?? []);
const filter = ref<'all' | 'active' | 'completed'>('all');
const isLoading = ref(false);
const error = ref<string | null>(null);

async function fetchTodos() {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await fetch(`/api/todos?filter=${filter.value}`);
    if (!res.ok) throw new Error('Failed to fetch');
    todos.value = await res.json();
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    isLoading.value = false;
  }
}

async function addTodo(text: string) {
  error.value = null;
  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error('Failed to add todo');
    await fetchTodos();
  } catch (e) {
    error.value = (e as Error).message;
  }
}

async function toggleTodo(id: number) {
  const todo = todos.value.find((t) => t.id === id);
  if (!todo) return;
  error.value = null;
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (!res.ok) throw new Error('Failed to toggle todo');
    await fetchTodos();
  } catch (e) {
    error.value = (e as Error).message;
  }
}

async function updateTodo(payload: { id: number; text: string }) {
  error.value = null;
  try {
    const res = await fetch(`/api/todos/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: payload.text }),
    });
    if (!res.ok) throw new Error('Failed to update todo');
    await fetchTodos();
  } catch (e) {
    error.value = (e as Error).message;
  }
}

async function deleteTodo(id: number) {
  error.value = null;
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete todo');
    await fetchTodos();
  } catch (e) {
    error.value = (e as Error).message;
  }
}

watch(filter, () => {
  fetchTodos();
});

fetchTodos();
</script>

<template>
  <div class="card bg-base-100 w-full max-w-lg shadow-xl">
    <div class="card-body">
      <TodoForm @add="addTodo" />

      <TodoFilter :current-filter="filter" @update:current-filter="filter = $event" />

      <div v-if="error" role="alert" class="alert alert-error py-2 text-sm">
        <span>{{ error }}</span>
      </div>

      <TodoList
        :todos="todos"
        :is-loading="isLoading"
        @toggle="toggleTodo"
        @update="updateTodo"
        @delete="deleteTodo"
      />
    </div>
  </div>
</template>
