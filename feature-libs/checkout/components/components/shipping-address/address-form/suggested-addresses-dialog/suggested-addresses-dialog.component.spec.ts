import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('SuggestedAddressDialogComponent', () => {
  let component: SuggestedAddressDialogComponent;
  let fixture: ComponentFixture<SuggestedAddressDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, I18nTestingModule],
        declarations: [SuggestedAddressDialogComponent, MockCxIconComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedAddressDialogComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
