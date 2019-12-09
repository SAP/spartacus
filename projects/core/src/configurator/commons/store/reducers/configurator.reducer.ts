import { Configurator } from '../../../../model/configurator.model';
import * as ConfiguratorActions from '../actions/configurator.action';

export const initialState: Configurator.Configuration = { configId: '' };
export const initialStatePendingChanges = 0;

export function reducer(
  state = initialState,
  action: ConfiguratorActions.ConfiguratorAction
): Configurator.Configuration {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE_SUCCESS:
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.READ_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_PRICE_SUMMARY_SUCCESS: {
      const content = { ...action.payload };

      const result = {
        ...state,
        ...content,
      };

      return result;
    }
    case ConfiguratorActions.GET_CONFIGURATION_OVERVIEW_SUCCESS: {
      const content = { ...action.payload };

      const result = {
        ...state,
        overview: content,
      };

      return result;
    }
    case ConfiguratorActions.SET_NEXT_OWNER_CART_ENTRY: {
      const content = { ...action.configuration };
      content.nextOwner = {
        type: Configurator.OwnerType.CART_ENTRY,
        id: action.cartEntryNo,
      };
      const result = {
        ...state,
        ...content,
      };

      return result;
    }
    case ConfiguratorActions.LOAD_CART_ENTRY_CONFIGURATION: {
      //This is hardcoded as long as we don't have the configure from cart option
      //It is meant to illustrate the overview navigation
      const content: Configurator.Configuration = {
        configId: '1234',
        productCode: 'WCEM_DEPENDENCY_PC',
        groups: [
          {
            id: 'Group1',
            name: 'Group1',
            configurable: true,
            attributes: [
              {
                name: 'Manufacturer',
                uiType: Configurator.UiType.RADIOBUTTON,
                label: 'Manufacturer',
                values: [
                  { valueCode: '1', valueDisplay: 'Any' },
                  { valueCode: '2', valueDisplay: 'Philips' },
                  { valueCode: '3', valueDisplay: 'Samsung' },
                ],
              },
              {
                name: 'Model',
                uiType: Configurator.UiType.RADIOBUTTON,
                label: 'Model',
                values: [
                  { valueCode: '1', valueDisplay: 'Samsung S27A950D' },
                  { valueCode: '2', valueDisplay: 'Samsung S24A350H' },
                  { valueCode: '3', valueDisplay: 'Philips 247E3LSU' },
                ],
              },
              {
                name: 'huhu',
                uiType: Configurator.UiType.STRING,
                label: 'Test mand. and readonly',
              },
            ],
          },
        ],
        owner: {
          type: Configurator.OwnerType.CART_ENTRY,
          key: Configurator.OwnerType.CART_ENTRY + '/' + action.cartEntryNumber,
          id: action.cartEntryNumber,
        },
      };

      const result = {
        ...state,
        ...content,
      };

      return result;
    }
  }
  return state;
}

export function reducerPendingChanges(
  state = initialStatePendingChanges,
  action: ConfiguratorActions.ConfiguratorAction
): number {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_CONFIGURATION_FAIL: {
      return addToPendingChanges(-1, state);
    }
    case ConfiguratorActions.UPDATE_CONFIGURATION: {
      return addToPendingChanges(1, state);
    }
  }
  return state;
}

function addToPendingChanges(increment: number, counter: number): number {
  let content = 0;
  let pendingChanges: number = counter;

  if (!pendingChanges) {
    pendingChanges = 0;
  }
  content = increment + pendingChanges;

  return content;
}
