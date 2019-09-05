
export const STORE_ENTITIES = '[StoreFinder] Store entities';

export class StoreEntities {
  readonly type = STORE_ENTITIES;
  constructor(public payload: any) {}
}

export type StoreEntitiesAction =
  | StoreEntities;
