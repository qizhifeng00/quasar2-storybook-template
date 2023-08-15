<template>
  <div>{{ counter }} <button @click="counterStore.increment()">{{ label }}</button></div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from 'src/stores/example-store';

withDefaults(defineProps<{
  label: string
}>(), {
  label: ''
})

const counterStore = useCounterStore();
const { counter } = storeToRefs(counterStore);
</script>
