import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { AnonymousConsentDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component';
import { ModalOptions, ModalRef, ModalService } from '../../../shared/index';
import { AnonymousConsentOpenDialogComponent } from './anonymous-consent-open-dialog.component';

class MockModalService {
  open(_content: any, _options?: ModalOptions): ModalRef {
    return undefined;
  }
}

describe('AnonymousConsentOpenDialogComponent', () => {
  let component: AnonymousConsentOpenDialogComponent;
  let fixture: ComponentFixture<AnonymousConsentOpenDialogComponent>;
  let modalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AnonymousConsentOpenDialogComponent],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousConsentOpenDialogComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialog', () => {
    it('should call modalService.open', () => {
      spyOn(modalService, 'open').and.stub();
      component.openDialog();
      expect(modalService.open).toHaveBeenCalledWith(
        AnonymousConsentDialogComponent,
        {
          centered: true,
          size: 'lg',
        }
      );
    });
  });
});
