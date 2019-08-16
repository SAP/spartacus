import { CaptchaActions } from '../actions/index';
import { CaptchaState } from '../captcha-state';

export const initialState: CaptchaState = {
  token: null,
};

export function reducer(
  state = initialState,
  action: CaptchaActions.CaptchaAction
): CaptchaState {
  switch (action.type) {
    case CaptchaActions.SET_TOKEN: {
      const token: string = action.payload;
      state = { token: token };
      return state;
    }
  }

  return state;
}
