import type { Meta, StoryObj } from '@storybook/vue3';

import ColorChip from 'src/components/UI/ColorChip.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'UI/ColorChip',
  component: ColorChip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select', options: ['green', 'yellow', 'blue']
    }
  }
} satisfies Meta<typeof ColorChip>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    color: 'green'
  },
};
