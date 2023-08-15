# Storybook

## Create project

```
yarn create quasar
```

## Create i18n for `en` and `fr`:

### FR

```ts
export default {
  failed: 'Action: échoué',
  success: 'Action réussie',
  yellow: 'Jaune',
  blue: 'Bleue',
  green: 'Verte'
};
```

### EN

```ts
export default {
  failed: 'Action failed',
  success: 'Action was successful',
  yellow: 'Yellow',
  blue: 'Blue',
  green: 'Green'
};
```

## Create two component

### ColorChip

```vue
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
```

### PiniaButton

```vue
<template>
  <div>{{ counter }} <button @click="counterStore.increment()">Increment</button></div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from 'src/stores/example-store';

const counterStore = useCounterStore();
const { counter } = storeToRefs(counterStore);
</script>
```

## Install Storybook

```
npx storybook@latest init
```

### Got the error about `vite`

```
yarn storybook
```

```
yarn add vite
```

## Create the first ChatMessage stories

```ts
import type { Meta, StoryObj } from '@storybook/vue3';

import ChatMessage from 'src/components/UI/ChatMessage.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'UI/ChatMessage',
  component: ChatMessage,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text'
    },
    sent: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    text: 'How r u?',
    sent: true
  },
};
```

### Fix error about the alias

```ts
// .storybook/main.ts

import type { StorybookConfig } from '@storybook/vue3-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    if(config.resolve) {
      config.resolve.alias  = {
        ...config.resolve.alias,
        'src': path.resolve(__dirname, "../src"),
      };
    }
    return config;
  },
};
export default config;
```

### Can't load Quasar component

```ts
import { setup } from '@storybook/vue3';

import { Quasar } from 'quasar';

setup((app) => {
  app.use(Quasar, {});
});
```

It works. But have no style. Just install the Quasar style:

```ts
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v5/mdi-v5.css';
import '@quasar/extras/animate/fadeInUp.css';
import '@quasar/extras/animate/fadeOutDown.css';
import '@quasar/extras/animate/fadeInRight.css';
import '@quasar/extras/animate/fadeOutRight.css';

import 'quasar/dist/quasar.css';
```

### Fix error i18n

Just need to add i18n for app in `setup`:

```ts
import { i18n } from '../src/boot/i18n';

setup((app) => {
  app.use(i18n);
});
```

### The error Pinia

Just need to add pinia for app in `setup`:

```ts
import { createPinia } from 'pinia';

setup((app) => {
  app.use(createPinia());
})
```

### Add button switch language

Create a global type for toolbar

```ts
const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en-US', title: 'English' },
        { value: 'fr', title: 'French' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  globalTypes
}
```

Add a decorator to handle the changing language:

```ts
const decorator = (story, context) => {
  const { locale } = context.globals;
  i18n.global.locale.value = locale;
  return story();
}

const preview: Preview = {
  decorators: [decorator]
}
```
