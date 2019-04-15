import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CloseAccountComponent } from './close-account.component';
import { I18nTestingModule, UserToken, AuthService } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}

describe('CloseAccountComponent', () => {
  let component: CloseAccountComponent;
  let fixture: ComponentFixture<CloseAccountComponent>;
  let modalInstance: any;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, NgbModule, RouterTestingModule],
      declarations: [CloseAccountComponent, MockTranslateUrlPipe],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        { provide: NgbModal, useValue: { open: () => {} } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAccountComponent);
    component = fixture.componentInstance;
    modalInstance = TestBed.get(NgbModal);
    authService = TestBed.get(AuthService);

    spyOn(modalInstance, 'open').and.returnValue({ componentInstance: {} });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal an pass userToken', () => {
    spyOn(authService, 'getUserToken').and.returnValue({
      userId: 'userId1',
    } as UserToken);
    component.openModal();

    expect(modalInstance.open).toHaveBeenCalledWith(
      CloseAccountModalComponent,
      Object({ centered: true })
    );
    expect(component.modal.userToken$).toEqual({ userId: 'userId1' });
  });
});
