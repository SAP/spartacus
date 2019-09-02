export enum TabbingOrderTypes {
  FORM_FIELD = 'formField',
  LINK = 'link',
  BUTTON = 'button',
}

export const tabbingOrderConfig = {
  login: [
    {
      value: 'userId',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'password',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'Forgot password?',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Sign In',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Register',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
};
