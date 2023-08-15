<template>
  <q-chat-message :text="[text]" :sent="sent" />
  1
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string;
    sent?: boolean;
  }>(),
  {
    text: '',
    sent: false,
  }
);
</script>
