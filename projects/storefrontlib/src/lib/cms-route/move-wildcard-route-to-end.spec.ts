import { TestBed } from '@angular/core/testing';
import { Router, Route } from '@angular/router';
import { moveWildcardRouteToEnd } from './move-wildcard-route-to-end';

const mockRoute1: Route = { path: 'path1' };
const mockRoute2: Route = { path: 'path2' };
const mockWildcardRoute1: Route = { path: '**', data: { test: 'test1' } };
const mockWildcardRoute2: Route = { path: '**', data: { test: 'test2' } };

describe('moveWildcardRouteToEnd', () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = { resetConfig: jasmine.createSpy('router.resetConfig') };

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }],
    });
  });

  it('should move wildcard route to the end of the list, even after custom route', async () => {
    mockRouter.config = [mockRoute1, mockWildcardRoute1, mockRoute2];
    moveWildcardRouteToEnd(mockRouter);
    expect(mockRouter.resetConfig).toHaveBeenCalledWith([
      mockRoute1,
      mockRoute2,
      mockWildcardRoute1,
    ]);
  });

  it('should leave only first wildcard route', async () => {
    mockRouter.config = [
      mockWildcardRoute1,
      mockRoute1,
      mockWildcardRoute2,
      mockRoute2,
    ];
    moveWildcardRouteToEnd(mockRouter);
    expect(mockRouter.resetConfig).toHaveBeenCalledWith([
      mockRoute1,
      mockRoute2,
      mockWildcardRoute1,
    ]);
  });
});
