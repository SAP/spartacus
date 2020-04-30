import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ModalOptions, ModalRef, ModalService } from '../../../shared/index';
import { AnonymousConsentLaunchDialogService } from '../anonymous-consent-launch-dialog.service';
import { AnonymousConsentOpenDialogComponent } from './anonymous-consent-open-dialog.component';

class MockModalService {
  open(_content: any, _options?: ModalOptions): ModalRef {
    return undefined;
  }
}

class MockAnonymousConsentLaunchDialogService {
  openDialog() {}
}

describe('AnonymousConsentOpenDialogComponent', () => {
  let component: AnonymousConsentOpenDialogComponent;
  let fixture: ComponentFixture<AnonymousConsentOpenDialogComponent>;
  let anonymousConsentLaunchDialogService: AnonymousConsentLaunchDialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AnonymousConsentOpenDialogComponent],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: AnonymousConsentLaunchDialogService,
          useClass: MockAnonymousConsentLaunchDialogService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousConsentOpenDialogComponent);
    component = fixture.componentInstance;
    anonymousConsentLaunchDialogService = TestBed.get(
      AnonymousConsentLaunchDialogService
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialog', () => {
    it('should call modalService.open', () => {
      spyOn(anonymousConsentLaunchDialogService, 'openDialog');
      component.openDialog();

      expect(
        anonymousConsentLaunchDialogService.openDialog
      ).toHaveBeenCalledWith(component.openElement, component['vcr']);
    });
  });
});
