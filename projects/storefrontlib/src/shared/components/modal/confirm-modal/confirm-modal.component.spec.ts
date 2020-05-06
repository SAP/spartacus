import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalService } from '../modal.service';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';

class MockModalService {
  dismissActiveModal(): void {}
  closeActiveModal(): void {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let mockModalService: MockModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfirmModalComponent, MockCxIconComponent],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    mockModalService = TestBed.inject(ModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit and close when onConfirm() called', () => {
    spyOn(component.confirm, 'emit');
    spyOn(mockModalService, 'closeActiveModal');
    component.onConfirm();
    fixture.detectChanges();
    expect(component.confirm.emit).toHaveBeenCalled();
    expect(mockModalService.closeActiveModal).toHaveBeenCalled();
  });

  it('should dismiss modal', () => {
    spyOn(mockModalService, 'dismissActiveModal');
    component.dismissModal();
    expect(mockModalService.dismissActiveModal).toHaveBeenCalled();
  });
});
