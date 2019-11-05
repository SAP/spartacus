import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccSaveCartAdapter } from './occ-save-cart.adapter';

describe('OccSaveCartAdapter', () => {
  let occSaveCartAdapter: OccSaveCartAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OccSaveCartAdapter],
    });
  });

  occSaveCartAdapter = TestBed.get(OccSaveCartAdapter Type<OccSaveCartAdapter>);
});
