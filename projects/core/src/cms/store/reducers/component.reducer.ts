import * as fromComponent from '../actions/component.action';
import { CmsComponent } from '../../../occ-models';
import { ComponentState } from '../cms-state';

export const initialState: ComponentState = {
  entities: {}
};

export function reducer<T extends CmsComponent>(
  state = initialState,
  action: fromComponent.ComponentAction<T>
): ComponentState {
  switch (action.type) {
    case fromComponent.LOAD_COMPONENT_SUCCESS: {
      const component: T = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [component.uid]: component
        }
      };
    }

    case fromComponent.GET_COMPONENET_FROM_PAGE: {
      const components: T[] = action.payload;
      const entities = components
        .filter(comp => state.entities[comp.uid] == null)
        .reduce(
          (compEntities: { [uid: string]: any }, component: T) => {
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
