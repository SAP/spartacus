import { EntityState } from '../entity/entity-state';
import { ProcessesLoaderState } from '../processes-loader/processes-loader-state';

export type EntityProcessesLoaderState<T> = EntityState<
  ProcessesLoaderState<T>
>;
