import { TestBed } from '@angular/core/testing';

import { Query, QueryService } from './query.service';
import { defer, of, Subject } from 'rxjs';

describe('QueryService', () => {
  let service: QueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should return query', () => {
    const query = service.create(() => of('value'));
    expect(query.get).toBeDefined();
    expect(query.getState).toBeDefined();
  });

  describe('query', () => {
    let query: Query<string>;
    let loadingStream$: Subject<string>;
    let loadingStreamAccessed: boolean;

    beforeEach(() => {
      loadingStreamAccessed = false;
      query = service.create(() =>
        defer(() => {
          loadingStreamAccessed = true;
          return loadingStream$;
        })
      );
      loadingStream$ = new Subject<string>();
    });

    it('should not load if not accessed', () => {
      const data = query.get();
      expect(data).toBeDefined();
      expect(loadingStreamAccessed).toBeFalse();
    });

    it('should load if first accessed', () => {
      query.get().subscribe().unsubscribe();
      const data = query.get();
      expect(data).toBeDefined();
      expect(loadingStreamAccessed).toBeTrue();
    });

  });
});
