import { CLOSE_ACCOUNT_MODAL_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CLOSE_ACCOUNT_MODAL_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/myaccount/close-account/components/close-account-modal/close-account-modal.component.ts
  selector: 'cx-close-account-modal',
  componentClassName: CLOSE_ACCOUNT_MODAL_COMPONENT,
  removedProperties: [
    {
      name: 'userToken$',
      comment: `'userToken$' property has been replaced with isLoggedIn$ Observable.`,
    },
  ],
};
