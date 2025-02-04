<template>
  <button class="custom-button" @click="handleClick">
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.custom-button {
  width: 20%;
  padding: 8px;
  background-color: #ccc;
  color: black;
  border: 2px solid #888;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.6rem;
  text-align: center;
  margin-left: auto;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  line-height: 1;
  box-shadow:
    2px 2px 5px rgba(0, 0, 0, 0.2),
    -2px -2px 5px rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #bbb;
  border-color: #666;
}
</style>
