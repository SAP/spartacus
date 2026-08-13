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
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { NEVER, Observable, of } from 'rxjs';
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

const ASSISTIVE_SELECTOR = '.cx-visually-hidden[aria-live="polite"]';

const mockComponentOverride = {
  remove: { imports: [IconComponent, TranslatePipe, FeatureDirective] },
  add: {
    imports: [MockCxIconComponent, MockTranslatePipe, MockFeatureDirective],
  },
};

function configureTestBed(providers: any[]): Promise<any> {
  return TestBed.configureTestingModule({
    imports: [GlobalMessageComponent],
    providers,
  })
    .overrideComponent(GlobalMessageComponent, mockComponentOverride)
    .compileComponents();
}

function createInitializedFixture(): ComponentFixture<GlobalMessageComponent> {
  const fixture = TestBed.createComponent(GlobalMessageComponent);
  fixture.componentInstance.ngOnInit();
  fixture.detectChanges();
  return fixture;
}

describe('GlobalMessageComponent', () => {
  let globalMessageComponent: GlobalMessageComponent;
  let messageService: GlobalMessageService;
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(waitForAsync(() => {
    configureTestBed([
      { provide: GlobalMessageService, useClass: MockMessageService },
    ]);
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
    // MockFeatureDirective only renders non-negated *cxFeature blocks.
    // With the toggle off, *cxFeature="'a11yFilteredFacetAnnouncement'" is not
    // negated but MockFeatureDirective renders it regardless of toggle value —
    // so we use provideMockFeatureToggles here for documentation purposes only.
    configureTestBed([
      {
        provide: GlobalMessageService,
        useClass: MockMessageServiceWithAssistive,
      },
      provideMockFeatureToggles({ a11yFilteredFacetAnnouncement: false }),
    ]);
  }));

  beforeEach(() => {
    fixture = createInitializedFixture();
  });

  it('should still render the persistent aria-live container (MockFeatureDirective renders all non-negated blocks)', () => {
    const assistiveDiv = fixture.debugElement.query(By.css(ASSISTIVE_SELECTOR));
    expect(assistiveDiv).toBeTruthy();
  });

  it('should not render the legacy dynamic aria-live elements (negated *cxFeature blocked by MockFeatureDirective)', () => {
    // The legacy path is behind *cxFeature="'!a11yFilteredFacetAnnouncement'"
    // which MockFeatureDirective always blocks — so only the stable container exists.
    const assistiveDivs = fixture.debugElement.queryAll(
      By.css(ASSISTIVE_SELECTOR)
    );
    expect(assistiveDivs.length).toBe(1);
  });
});

describe('GlobalMessageComponent with a11yFilteredFacetAnnouncement enabled', () => {
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(waitForAsync(() => {
    configureTestBed([
      {
        provide: GlobalMessageService,
        useClass: MockMessageServiceWithAssistive,
      },
      provideMockFeatureToggles({ a11yFilteredFacetAnnouncement: true }),
    ]);
  }));

  beforeEach(() => {
    fixture = createInitializedFixture();
  });

  it('should render a single persistent aria-live container', () => {
    const assistiveDivs = fixture.debugElement.queryAll(
      By.css(ASSISTIVE_SELECTOR)
    );
    expect(assistiveDivs.length).toBe(1);
  });

  it('should display the assistive message text in the persistent container', () => {
    const assistiveDiv = fixture.debugElement.query(By.css(ASSISTIVE_SELECTOR));
    expect(assistiveDiv.nativeElement.textContent.trim()).toBe(
      'Filter added: Stores'
    );
  });

  it('should render empty container when there are no assistive messages', () => {
    spyOn(TestBed.inject(GlobalMessageService), 'get').and.returnValue(
      of(mockMessages)
    );

    fixture = createInitializedFixture();

    const assistiveDiv = fixture.debugElement.query(By.css(ASSISTIVE_SELECTOR));
    expect(assistiveDiv).toBeTruthy();
    expect(assistiveDiv.nativeElement.textContent.trim()).toBe('');
  });
});

describe('GlobalMessageComponent a11yFilteredFacetAnnouncement — aria-live container pre-existence', () => {
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(waitForAsync(() => {
    configureTestBed([
      {
        provide: GlobalMessageService,
        useValue: { get: () => NEVER, remove: createSpy() },
      },
      provideMockFeatureToggles({ a11yFilteredFacetAnnouncement: true }),
    ]);
  }));

  beforeEach(() => {
    fixture = createInitializedFixture();
  });

  it('should have aria-live container in the DOM before any messages arrive', () => {
    // Verify the container exists even when messages$ has not emitted yet,
    // so VoiceOver can register it as a live region on page load.
    const assistiveDiv = fixture.debugElement.query(By.css(ASSISTIVE_SELECTOR));
    expect(assistiveDiv).toBeTruthy();
  });
});
