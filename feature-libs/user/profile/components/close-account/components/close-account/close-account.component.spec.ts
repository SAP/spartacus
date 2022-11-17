import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE, ModalService } from '@spartacus/storefront';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';
import { CloseAccountComponent } from './close-account.component';

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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [CloseAccountComponent, MockUrlPipe, MockCxIconComponent],
        providers: [{ provide: ModalService, useValue: { open: () => {} } }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAccountComponent);
    component = fixture.componentInstance;
    modalInstance = TestBed.inject(ModalService);

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
