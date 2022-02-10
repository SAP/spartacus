import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { PageContext } from '../../models/page-context.model';
import { RouterState, ROUTING_FEATURE, State } from '../routing-state';

export const getRouterFeatureState: MemoizedSelector<any, State> =
  createFeatureSelector<State>(ROUTING_FEATURE);

export const getRouterState: MemoizedSelector<any, RouterState> =
  createSelector(getRouterFeatureState, (state) => state.router);

export const getSemanticRoute: MemoizedSelector<any, string> = createSelector(
  getRouterState,
  (routingState: RouterState) =>
    (routingState.state && routingState.state.semanticRoute) || ''
);

export const getPageContext: MemoizedSelector<any, PageContext> =
  createSelector(
    getRouterState,
    (routingState: RouterState) =>
      (routingState.state && routingState.state.context) || { id: '' }
  );

export const getNextPageContext: MemoizedSelector<any, PageContext> =
  createSelector(
    getRouterState,
    (routingState: RouterState) =>
      routingState.nextState && routingState.nextState.context
  );

export const isNavigating: MemoizedSelector<any, boolean> = createSelector(
  getNextPageContext,
  (context) => !!context
);
