import type { Meta, StoryObj } from '@storybook/vue3';

import PiniaButton from 'src/components/UI/PiniaButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'UI/PiniaButton',
  component: PiniaButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text'
    }
  }
} satisfies Meta<typeof PiniaButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    label: 'Up'
  },
};
