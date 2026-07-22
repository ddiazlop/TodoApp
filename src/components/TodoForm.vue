<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  add: [text: string];
}>();

const newText = ref('');
const isAdding = ref(false);

async function submit() {
  const text = newText.value.trim();
  if (!text || isAdding.value) return;

  isAdding.value = true;
  emit('add', text);
  newText.value = '';
  isAdding.value = false;
}
</script>

<template>
  <form @submit.prevent="submit" class="flex gap-2">
    <input
      v-model="newText"
      type="text"
      placeholder="What needs to be done?"
      class="input input-bordered flex-1"
      :disabled="isAdding"
    />
    <button
      type="submit"
      class="btn btn-primary"
      :disabled="!newText.trim() || isAdding"
    >
      Add
    </button>
  </form>
</template>
