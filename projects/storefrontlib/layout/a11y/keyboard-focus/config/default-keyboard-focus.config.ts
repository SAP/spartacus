import { KeyboardFocusConfig } from './keyboard-focus.config';

/**
 * @deprecated since 4.2, refer to spartacus issues (#13762)
 */
export const defaultKeyboardFocusConfig: KeyboardFocusConfig = {
  keyboardFocus: {
    enableResetFocusOnNavigate: false,
    enableResetViewOnNavigate: false,
  },
};
