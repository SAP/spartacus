import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDialogComponent } from './notification-dialog.component';
import { I18nTestingModule, ProductInterestService } from '@spartacus/core';
import { Pipe, PipeTransform, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

class MockNgbActiveModal {
  dismiss(): void {}
  close(): void {}
}

describe('NotificationDialogComponent', () => {
  let component: NotificationDialogComponent;
  let fixture: ComponentFixture<NotificationDialogComponent>;
  const productInterestService: ProductInterestService = jasmine.createSpyObj(
    'ProductInterestService',
    ['resetCreateState']
  );

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
          useClass: MockNgbActiveModal,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
