import ColorEditor from './color-editor.html';

export default {
  title: 'blocks/color-editor',
  tags: ['autodocs'],
  render: (args) => ColorEditor(args),
  argTypes: {},
  args: {
    color: '#143dda',
    name: 'Blue',
  },
};

export const Default = {
  args: {},
};