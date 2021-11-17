import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService } from '../../../../../shared/components/modal/index';
import { ICON_TYPE } from '../../../../misc/index';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockModalService {
  closeActiveModal = createSpy('closeActiveModal');
}

describe('SuggestedAddressDialogComponent', () => {
  let component: SuggestedAddressDialogComponent;
  let fixture: ComponentFixture<SuggestedAddressDialogComponent>;
  let modalService: ModalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, I18nTestingModule],
        providers: [{ provide: ModalService, useClass: MockModalService }],
        declarations: [SuggestedAddressDialogComponent, MockCxIconComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedAddressDialogComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    component.closeModal();
    expect(modalService.closeActiveModal).toHaveBeenCalled();
  });
});
