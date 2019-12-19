import createSpy = jasmine.createSpy;
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SaveCartAdapter } from './save-cart.adapter';
import { SaveCartConnector } from './save-cart.connecter';

class MockSaveCartAdapter implements SaveCartAdapter {
  saveCart = createSpy().and.callFake(
    (userId, cartId, saveCartName, saveCartDescription) =>
      of('save' + userId + cartId + saveCartName + saveCartDescription)
  );
}

describe('SaveCartConnector', () => {
  let service: SaveCartConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SaveCartAdapter, useClass: MockSaveCartAdapter }],
    });

    service = TestBed.get(SaveCartConnector as Type<SaveCartConnector>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should call adapter', () => {
    const adapter: SaveCartAdapter = TestBed.get(SaveCartAdapter as Type<
      SaveCartAdapter
    >);

    let result;
    service
      .saveCart('uid', '1', 'name', 'description')
      .subscribe(res => (result = res));
    expect(result).toBe('saveuid1namedescription');
    expect(adapter.saveCart).toHaveBeenCalledWith(
      'uid',
      '1',
      'name',
      'description'
    );
  });
});
