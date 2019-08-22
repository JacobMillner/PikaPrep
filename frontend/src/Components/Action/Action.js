// action/index.js

export const FLASH_MESSAGE = 'FLASH_MESSAGE';

export const sendFlashMessage = (message, className) => {

  return {
    type: FLASH_MESSAGE,
    payload: {
      message,
      className
    }
  }
};