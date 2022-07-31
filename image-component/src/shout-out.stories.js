import React from 'react';

import { ShoutOut } from './shout-out';

export default {
  title: 'ShoutOut',
  component: ShoutOut,
};

const Template = (args) => <ShoutOut {...args} />;

export const Default = Template.bind({});
Default.args = {
  image: 'https://yannbraga.dev/_next/image?url=%2Fstatic%2Fimages%2Favatar.png&w=384&q=75',
  username: 'Yann Braga',
  message: 'Creating an addon-like experience in Storybook using parameters and globals'
};
