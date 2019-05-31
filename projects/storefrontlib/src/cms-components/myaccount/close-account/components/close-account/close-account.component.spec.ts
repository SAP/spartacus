import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CloseAccountComponent } from './close-account.component';
import { I18nTestingModule } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe, PipeTransform, Component, Input } from '@angular/core';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';
import { ModalService } from '../../../../../shared/components/modal/index';
import { ICON_TYPE } from '../../../../../cms-components/misc/index';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CloseAccountComponent', () => {
  let component: CloseAccountComponent;
  let fixture: ComponentFixture<CloseAccountComponent>;
  let modalInstance: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [CloseAccountComponent, MockUrlPipe, MockCxIconComponent],
      providers: [{ provide: ModalService, useValue: { open: () => {} } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAccountComponent);
    component = fixture.componentInstance;
    modalInstance = TestBed.get(ModalService);

    spyOn(modalInstance, 'open').and.returnValue({ componentInstance: {} });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    component.openModal();

    expect(modalInstance.open).toHaveBeenCalledWith(
      CloseAccountModalComponent,
      Object({ centered: true })
    );
  });
});
