import * as fromBackInStockAction from './back-in-stock.actions';

import {
  entityFailMeta,
  entityLoadMeta,
  entitySuccessMeta,
  entityResetMeta
} from '../../../state/utils/entity-loader/entity-loader.action';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  DELETE_BACK_IN_STOCK_PROCESS_ID,
  CREATE_BACK_IN_STOCK_PROCESS_ID,
} from '../product-interests-state';
describe('Bakc In Stock Actions', () => {
  describe('LoadBackInStock Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: 'jack.ma@hybris.com',
        productCode: '9879',
        notificationType: 'BACK_IN_STOCK',
      };
      const action = new fromBackInStockAction.LoadBackInStock(payload);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.LOAD_BACK_IN_STOCK,
        payload: payload,
      });
    });
  });

  describe('LoadBackInStockSuccess Actions', () => {
    it('should be able to create the action', () => {
      const action = new fromBackInStockAction.LoadBackInStockSuccess(true);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.LOAD_BACK_IN_STOCK_SUCCESS,
        payload: true,
      });
    });
  });

  describe('LoadBackInStockFail Actions', () => {
    it('should be able to create the action', () => {
      const error = 'error';
      const action = new fromBackInStockAction.LoadBackInStockFail(error);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.LOAD_BACK_IN_STOCK_FAIL,
        payload: error,
      });
    });
  });

  describe('DeleteBackInStock Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: 'jack.ma@hybris.com',
        productCode: '9879',
        notificationType: 'BACK_IN_STOCK',
      };
      const action = new fromBackInStockAction.DeleteBackInStock(payload);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.DELETE_BACK_IN_STOCK,
        payload: payload,
        meta: entityLoadMeta(PROCESS_FEATURE, DELETE_BACK_IN_STOCK_PROCESS_ID),
      });
    });
  });

  describe('DeleteBackInStockFail Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: 'jack.ma@hybris.com',
        productCode: '9879',
        notificationType: 'BACK_IN_STOCK',
      };
      const action = new fromBackInStockAction.DeleteBackInStockFail(payload);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.DELETE_BACK_IN_STOCK_FAIL,
        payload: payload,
        meta: entityFailMeta(PROCESS_FEATURE, DELETE_BACK_IN_STOCK_PROCESS_ID, payload),
      });
    });
  });

  describe('DeleteBackInStockSuccess Actions', () => {
    it('should be able to create the action', () => {
      const action = new fromBackInStockAction.DeleteBackInStockSuccess(true);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.DELETE_BACK_IN_STOCK_SUCCESS,
        payload: true,
        meta: entitySuccessMeta(PROCESS_FEATURE, DELETE_BACK_IN_STOCK_PROCESS_ID),
      });
    });
  });

  describe('CreateBackInStock Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: 'jack.ma@hybris.com',
        productCode: '9879',
        notificationType: 'BACK_IN_STOCK',
      };
      const action = new fromBackInStockAction.CreateBackInStock(payload);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.CREATE_BACK_IN_STOCK,
        payload: payload,
        meta: entityLoadMeta(PROCESS_FEATURE, CREATE_BACK_IN_STOCK_PROCESS_ID),
      });
    });
  });

  describe('CreateBackInStockFail Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: 'jack.ma@hybris.com',
        productCode: '9879',
        notificationType: 'BACK_IN_STOCK',
      };
      const action = new fromBackInStockAction.CreateBackInStockFail(payload);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.CREATE_BACK_IN_STOCK_FAIL,
        payload: payload,
        meta: entityFailMeta(PROCESS_FEATURE, CREATE_BACK_IN_STOCK_PROCESS_ID, payload),
      });
    });
  });

  describe('CreateBackInStockSuccess Actions', () => {
    it('should be able to create the action', () => {
      const action = new fromBackInStockAction.CreateBackInStockSuccess(true);
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.CREATE_BACK_IN_STOCK_SUCCESS,
        payload: true,
        meta: entitySuccessMeta(PROCESS_FEATURE, CREATE_BACK_IN_STOCK_PROCESS_ID),
      });
    });
  });

  describe('ResetDeleteAction Actions', () => {
    it('should be able to create the action', () => {
      const action = new fromBackInStockAction.ResetDeleteAction();
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.RESET_DELETE,
        meta: entityResetMeta(PROCESS_FEATURE, DELETE_BACK_IN_STOCK_PROCESS_ID),
      });
    });
  });

  describe('ResetCreateAction Actions', () => {
    it('should be able to create the action', () => {
      const action = new fromBackInStockAction.ResetCreateAction();
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.RESET_CREATE,
        meta: entityResetMeta(PROCESS_FEATURE, CREATE_BACK_IN_STOCK_PROCESS_ID),
      });
    });
  });

  describe('ResetBackInStock Actions', () => {
    it('should be able to create the action', () => {
      const action = new fromBackInStockAction.ResetBackInStock();
      expect({ ...action }).toEqual({
        type: fromBackInStockAction.RESET_BACK_IN_STOCK,
      });
    });
  });
});
