import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
} from '@spartacus/core';
import { of } from 'rxjs';
import { AtMessageModule } from './assistive-technology-message.module';
import createSpy = jasmine.createSpy;

@Component({
  template: `
    <button class="cancel-btn" [cxAtMessage]="'common.cancel' | cxTranslate">
      Action
    </button>
    <button
      class="results-btn"
      [cxAtMessage]="'searchBox.productsResult' | cxTranslate: { count: 4 }"
    >
      Action
    </button>
    <button
      class="confirm-btn"
      [cxAtMessage]="[
        'checkoutOrderConfirmation.thankYou' | cxTranslate,
        'checkoutOrderConfirmation.invoiceHasBeenSentByEmail' | cxTranslate
      ]"
    >
      Action
    </button>
  `,
})
class MockComponent {}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy().and.stub();
  get = createSpy().and.returnValue(of([GlobalMessageType.MSG_TYPE_ASSISTIVE]));
}

describe('AtMessageDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AtMessageModule, I18nTestingModule],
      declarations: [MockComponent],
      providers: [
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    globalMessageService = TestBed.inject(GlobalMessageService);
    component = fixture.componentInstance;
  });

  function getCancelButton(): DebugElement {
    return fixture.debugElement.query(By.css('.cancel-btn'));
  }

  function getResultsButton(): DebugElement {
    return fixture.debugElement.query(By.css('.results-btn'));
  }

  function getConfirmationButton(): DebugElement {
    return fixture.debugElement.query(By.css('.confirm-btn'));
  }

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  it('should add assistive global message on click', () => {
    fixture.detectChanges();
    getCancelButton().nativeElement.click();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'common.cancel',
      GlobalMessageType.MSG_TYPE_ASSISTIVE
    );
  });

  it('should add assistive global message with parameters on click', () => {
    fixture.detectChanges();
    getResultsButton().nativeElement.click();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'searchBox.productsResult count:4',
      GlobalMessageType.MSG_TYPE_ASSISTIVE
    );
  });

  it('should add assitive global message composed from two translations', () => {
    const expectedMessage =
      'checkoutOrderConfirmation.thankYou\n' +
      'checkoutOrderConfirmation.invoiceHasBeenSentByEmail';
    fixture.detectChanges();
    getConfirmationButton().nativeElement.click();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      expectedMessage,
      GlobalMessageType.MSG_TYPE_ASSISTIVE
    );
  });
});
