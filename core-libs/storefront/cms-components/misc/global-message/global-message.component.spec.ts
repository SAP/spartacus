import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FeatureDirective,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { Observable, NEVER, of } from 'rxjs';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { IconComponent } from '../icon/icon.component';
import { GlobalMessageComponent } from './global-message.component';
import createSpy = jasmine.createSpy;

const mockMessages: GlobalMessageEntities = {
  [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [{ raw: 'Confirmation' }],
  [GlobalMessageType.MSG_TYPE_INFO]: [{ raw: 'Info' }],
  [GlobalMessageType.MSG_TYPE_ERROR]: [{ raw: 'Error' }],
};

const mockMessagesWithAssistive: GlobalMessageEntities = {
  ...mockMessages,
  [GlobalMessageType.MSG_TYPE_ASSISTIVE]: [{ raw: 'Filter added: Stores' }],
};

class MockMessageService {
  remove = createSpy();
  get(): Observable<GlobalMessageEntities> {
    return of(mockMessages);
  }
}

class MockMessageServiceWithAssistive {
  remove = createSpy();
  get(): Observable<GlobalMessageEntities> {
    return of(mockMessagesWithAssistive);
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

describe('GlobalMessageComponent', () => {
  let globalMessageComponent: GlobalMessageComponent;
  let messageService: GlobalMessageService;
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GlobalMessageComponent],
      providers: [
        { provide: GlobalMessageService, useClass: MockMessageService },
      ],
    })
      .overrideComponent(GlobalMessageComponent, {
        remove: { imports: [IconComponent, TranslatePipe, FeatureDirective] },
        add: {
          imports: [
            MockCxIconComponent,
            MockTranslatePipe,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageComponent);
    globalMessageComponent = fixture.componentInstance;
    messageService = TestBed.inject(GlobalMessageService);
  });

  it('Should create Global message component', () => {
    expect(globalMessageComponent).toBeTruthy();
  });

  it('Should not have duplicate messages per message type', () => {
    globalMessageComponent.ngOnInit();
    globalMessageComponent.messages$.subscribe((messages) => {
      expect(messages[GlobalMessageType.MSG_TYPE_CONFIRMATION].length).toBe(1);
    });
  });

  it('Should be able to remove messages', () => {
    globalMessageComponent.clear(GlobalMessageType.MSG_TYPE_CONFIRMATION, 0);
    expect(messageService.remove).toHaveBeenCalledWith(
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      0
    );
  });
});

describe('GlobalMessageComponent with a11yFilteredFacetAnnouncement disabled', () => {
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GlobalMessageComponent],
      providers: [
        {
          provide: GlobalMessageService,
          useClass: MockMessageServiceWithAssistive,
        },
        provideMockFeatureToggles({ a11yFilteredFacetAnnouncement: false }),
      ],
    })
      .overrideComponent(GlobalMessageComponent, {
        remove: { imports: [IconComponent, TranslatePipe, FeatureDirective] },
        add: {
          imports: [
            MockCxIconComponent,
            MockTranslatePipe,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageComponent);
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
  });

  it('should render assistive message via *ngFor (legacy dynamic element)', () => {
    const assistiveDivs = fixture.debugElement.queryAll(
      By.css('.cx-visually-hidden[aria-live="polite"]')
    );
    expect(assistiveDivs.length).toBe(1);
    expect(assistiveDivs[0].nativeElement.textContent.trim()).toBe(
      'Filter added: Stores'
    );
  });
});

describe('GlobalMessageComponent with a11yFilteredFacetAnnouncement enabled', () => {
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GlobalMessageComponent],
      providers: [
        {
          provide: GlobalMessageService,
          useClass: MockMessageServiceWithAssistive,
        },
        provideMockFeatureToggles({ a11yFilteredFacetAnnouncement: true }),
      ],
    })
      .overrideComponent(GlobalMessageComponent, {
        remove: { imports: [IconComponent, TranslatePipe, FeatureDirective] },
        add: {
          imports: [
            MockCxIconComponent,
            MockTranslatePipe,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageComponent);
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
  });

  it('should render a single persistent aria-live container', () => {
    const assistiveDivs = fixture.debugElement.queryAll(
      By.css('.cx-visually-hidden[aria-live="polite"]')
    );
    expect(assistiveDivs.length).toBe(1);
  });

  it('should have aria-live container in the DOM before any messages arrive', () => {
    // Simulate a component where messages$ has not emitted yet — the container
    // must already exist so VoiceOver can register it as a live region.
    spyOn(TestBed.inject(GlobalMessageService), 'get').and.returnValue(NEVER);

    fixture = TestBed.createComponent(GlobalMessageComponent);
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    const assistiveDiv = fixture.debugElement.query(
      By.css('.cx-visually-hidden[aria-live="polite"]')
    );
    expect(assistiveDiv).toBeTruthy();
  });

  it('should display the assistive message text in the persistent container', () => {
    const assistiveDiv = fixture.debugElement.query(
      By.css('.cx-visually-hidden[aria-live="polite"]')
    );
    expect(assistiveDiv.nativeElement.textContent.trim()).toBe(
      'Filter added: Stores'
    );
  });

  it('should render empty container when there is no assistive message', () => {
    spyOn(TestBed.inject(GlobalMessageService), 'get').and.returnValue(
      of(mockMessages)
    );

    fixture = TestBed.createComponent(GlobalMessageComponent);
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    const assistiveDiv = fixture.debugElement.query(
      By.css('.cx-visually-hidden[aria-live="polite"]')
    );
    expect(assistiveDiv).toBeTruthy();
    expect(assistiveDiv.nativeElement.textContent.trim()).toBe('');
  });
});
