import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';

export const PROCESS_FEATURE = 'process';

export interface StateWithProcess<T> {
  [PROCESS_FEATURE]: EntityLoaderState<T>;
}
