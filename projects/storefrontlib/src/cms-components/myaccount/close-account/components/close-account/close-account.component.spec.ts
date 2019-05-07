import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CloseAccountComponent } from './close-account.component';
import { I18nTestingModule } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';

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
      imports: [I18nTestingModule, NgbModule, RouterTestingModule],
      declarations: [CloseAccountComponent, MockUrlPipe],
      providers: [{ provide: NgbModal, useValue: { open: () => {} } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAccountComponent);
    component = fixture.componentInstance;
    modalInstance = TestBed.get(NgbModal);

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
