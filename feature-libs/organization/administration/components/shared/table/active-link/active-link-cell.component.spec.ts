import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FeatureToggles, I18nTestingModule, UrlPipe } from '@spartacus/core';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { OutletContextData } from '@spartacus/storefront';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { ActiveLinkCellComponent } from '..';

const mockContext = {
  _field: 'name',
  _type: 'myType',
  _options: {
    cells: {
      name: {
        linkable: true,
      },
    },
  },
  name: 'my name',
  code: 'my code',
};

describe('ActiveLinkCellComponent', () => {
  let component: ActiveLinkCellComponent;
  let fixture: ComponentFixture<ActiveLinkCellComponent>;
  let toggleController: MockFeatureTogglesController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ActiveLinkCellComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: OutletContextData,
          useValue: { context: mockContext },
        },
        ...provideMockFeatureToggles({ a11yTableKeyboardNavigation: false }),
      ],
    })
      .overrideProvider(FeatureToggles, {
        useFactory: () => TestBed.inject(MockFeatureTogglesController),
      })
      .overrideComponent(ActiveLinkCellComponent, {
        remove: { imports: [UrlPipe] },
        add: { imports: [MockUrlPipe] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveLinkCellComponent);
    component = fixture.componentInstance;
    toggleController = TestBed.inject(MockFeatureTogglesController);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return 0 for tabIndex', () => {
    fixture.detectChanges();
    expect(component.tabIndex).toEqual(0);
  });

  it('should render tabindex = 0 by default', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.query(By.css('a')).nativeNode;
    expect(el.tabIndex).toEqual(0);
  });

  describe('when a11yTableKeyboardNavigation is ON', () => {
    beforeEach(() => {
      toggleController.set('a11yTableKeyboardNavigation', true);
      fixture.detectChanges();
    });

    it('should return -1 for tabIndex when a11yTableKeyboardNavigation is on', () => {
      expect(component.tabIndex).toEqual(-1);
    });

    it('should render tabindex = -1 on <a> when a11yTableKeyboardNavigation is on', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('a')
      ).nativeNode;
      expect(el.tabIndex).toEqual(-1);
    });
  });
});
