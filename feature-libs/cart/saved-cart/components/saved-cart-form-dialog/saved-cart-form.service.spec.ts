import { TestBed } from '@angular/core/testing';
import { SavedCartFormService } from './saved-cart-form.service';

describe('SavedCartFormService', () => {
  let service: SavedCartFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedCartFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
