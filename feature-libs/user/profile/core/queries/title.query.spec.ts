import { TestBed } from '@angular/core/testing';

import { TitleQuery } from './title.query';

describe('TitleLoaderService', () => {
  let service: TitleQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleQuery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
