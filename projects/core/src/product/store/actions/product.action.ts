import { Action } from '@ngrx/store';
import { Product } from '../../../occ-models';
import { EntityMeta } from '../../../store-entities/entity.action';
import { EntityAction } from '../../../store-entities/entity.action';

export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';

export const PRODUCT_DETAIL_ENTITY = '[Product] Detail Entity';

export class LoadProduct2 implements Action {
  readonly type = LOAD_PRODUCT;
  constructor(public payload: string) {}
}

export class LoadEntity implements Action {
  readonly type = 'LOAD ENTITY';
  meta: EntityMeta;
  constructor(entityType: string) {}
}

export class LoadData implements Action {
  type = 'LOAD ENTITY';
  meta: EntityMeta;
  constructor(type: string, id?: string) {
    this.meta = {
      entity: {
        type,
        id,
        load: true
      }
    };
  }
}

export class LoadProduct extends LoadData {
  readonly type = 'LOAD PRODUCT';
  constructor(productCode: string) {
    super(PRODUCT_DETAIL_ENTITY, productCode);
  }
}

export class LoadProduct3 implements Action {
  readonly type = LOAD_PRODUCT;
  meta: EntityMeta;
  constructor(public payload: string) {
    this.meta = {
      entity: {
        id: payload,
        load: true
      }
    };
  }
}

export class LoadProductFail2 implements Action {
  readonly type = LOAD_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductFail implements Action {
  readonly type = LOAD_PRODUCT;
  meta: EntityMeta;
  constructor(public payload: any) {
    this.meta = {
      entity: {
        id: payload,
        error: true
      }
    };
  }
}

export class LoadProductSuccess implements Action {
  readonly type = LOAD_PRODUCT;
  meta: EntityMeta;
  constructor(public payload: Product) {
    this.meta = { entity: { id: payload.code, type: PRODUCT_DETAIL_ENTITY } };
  }
}

export class LoadProductSuccess2 implements Action {
  readonly type = LOAD_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

// action types
export type ProductAction = LoadProduct | LoadProductFail | LoadProductSuccess;
