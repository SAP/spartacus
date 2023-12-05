import { EntityState } from './entity-state';
export declare function entitySelector<T>(state: EntityState<T>, id: string): T | undefined;
