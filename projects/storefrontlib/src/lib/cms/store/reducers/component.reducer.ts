import * as fromComponent from '../actions/component.action';
import { Component } from '@spartacus/core';

export interface ComponentState {
  entities: { [id: string]: any };
}

export const initialState: ComponentState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromComponent.ComponentAction
): ComponentState {
  switch (action.type) {
    case fromComponent.LOAD_COMPONENT_SUCCESS: {
      const component: Component = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [component.uid]: component
        }
      };
    }

    case fromComponent.GET_COMPONENET_FROM_PAGE: {
      const components: Component[] = action.payload;
      const entities = components
        .filter(comp => state.entities[comp.uid] == null)
        .reduce(
          (compEntities: { [uid: string]: any }, component: Component) => {
            return {
              ...compEntities,
              [component.uid]: component
            };
          },
          {
            ...state.entities
          }
        );

      return {
        ...state,
        entities
      };
    }

    case fromComponent.CLEAN_COMPONENT_STATE: {
      return initialState;
    }
  }
  return state;
}

export const getComponentEntities = (state: ComponentState) => state.entities;
