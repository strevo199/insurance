export const add = require('./add.png');
export const arrowLeft = require('./arrowLeft.png');
export const camera = require('./camera.png');
export const trash = require('./trash.png');

const imageIcon = {
  add: add,
  arrowLeft,
  camera,
  trash
};

export type ImageIconType = keyof typeof imageIcon;
