import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDialogComponent } from './notification-dialog.component';
import { Pipe, PipeTransform, Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, ProductInterestService } from '@spartacus/core';
import { of } from 'rxjs';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('NotificationDialogComponent', () => {
  let component: NotificationDialogComponent;
  let fixture: ComponentFixture<NotificationDialogComponent>;
  let el: DebugElement;

  const productInterestService = jasmine.createSpyObj(
    'ProductInterestService',
    ['resetCreateState', 'createBackInStock']
  );
  const ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);

  ngbActiveModal.dismiss.and.stub();
  productInterestService.resetCreateState.and.stub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        NotificationDialogComponent,
        MockUrlPipe,
        MockCxSpinnerComponent,
      ],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: ngbActiveModal,
        },
        {
          provide: ProductInterestService,
          useValue: productInterestService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDialogComponent);
    component = fixture.componentInstance;
    component.subscribeSuccess$ = of(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show notification dialog', () => {
    fixture.detectChanges();

    expect(el.query(By.css('[data-test]="notifydialog-title"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="close-button"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="notify-channel"'))).toBeTruthy();
    expect(
      el.queryAll(By.css('[data-test]="notifydialog-link"')).length
    ).toEqual(2);
    expect(el.query(By.css('[data-test]="ok-button"'))).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    component.subscribeSuccess$ = of(false);
    productInterestService.createBackInStock.and.returnValue({});
    fixture.detectChanges();

    expect(el.query(By.css('.cx-spinner'))).toBeTruthy();
  });

  it('should be able to close dialog', () => {
    fixture.detectChanges();

    el.query(By.css('[data-test]="close-button"')).nativeElement.click();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });

  it('should be able to close dialog', () => {
    fixture.detectChanges();

    el.query(By.css('[data-test]="okay-button"')).nativeElement.click();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });
});
