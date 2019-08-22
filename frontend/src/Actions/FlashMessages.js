import { ADD_FLASH_MESSAGE } from './Types';

export function addFlashMessage(message) {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    }
}