<template>
  <q-chip :color="color" :label="t(color)" />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
export type Color = 'yellow' | 'green' | 'blue';

export interface ColorLabelProps {
  color: Color
}

const { t } = useI18n();

defineProps<ColorLabelProps>();
</script>
