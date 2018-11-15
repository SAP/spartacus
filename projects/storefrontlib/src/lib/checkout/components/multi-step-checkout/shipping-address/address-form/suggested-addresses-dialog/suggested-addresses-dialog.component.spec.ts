import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';

describe('SuggestedAddressDialogComponent', () => {
  let component: SuggestedAddressDialogComponent;
  let fixture: ComponentFixture<SuggestedAddressDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SuggestedAddressDialogComponent],
      providers: [NgbActiveModal]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedAddressDialogComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
