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
