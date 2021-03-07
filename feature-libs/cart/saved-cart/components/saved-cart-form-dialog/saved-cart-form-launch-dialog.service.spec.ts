import { TestBed } from '@angular/core/testing';
import { SavedCartFormLaunchDialogService } from './saved-cart-form-launch-dialog.service';

describe('SavedCartFormLaunchDialogService', () => {
  let service: SavedCartFormLaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedCartFormLaunchDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
