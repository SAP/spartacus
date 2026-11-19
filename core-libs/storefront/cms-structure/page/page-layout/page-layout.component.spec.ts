import { Component, Injectable, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsService,
  ContentSlotData,
  CustomSection,
  Page,
  SectionItem,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DeferLoaderService } from '../../../layout/loading/defer-loader.service';
import { DirectiveStateTransferService } from '../../../utils';
import { OutletDirective } from '../../outlet';
import { PageSlotComponent } from '../slot';
import { PageLayoutComponent } from './page-layout.component';
import { PageLayoutService } from './page-layout.service';
import { PageTemplateDirective } from './page-template.directive';

const slots = {
  Section1: {
    uid: 'Section1',
    components: [],
  },
};

const customItem: SectionItem = {
  name: 'main',
  position: 'CustomMainSlot',
  rowStart: 1,
  colStart: 2,
  rowSpan: 2,
  colSpan: 3,
};

const customSections: CustomSection[] = [
  { name: 'main', sectionItems: [customItem] },
  {
    name: 'secondary',
    sectionItems: [{ ...customItem, position: 'CustomSecondarySlot' }],
  },
];

@Component({
  selector: 'cx-page-template-test',
  template: `
    <cx-page-layout cxPageTemplateStyle>
      <div class="content">content projection</div>
    </cx-page-layout>
  `,
  imports: [PageLayoutComponent, PageTemplateDirective],
})
class MockPageTemplateComponent {}

@Component({
  selector: 'cx-page-header-test',
  template: ` <cx-page-layout section="header" /> `,
  imports: [PageLayoutComponent],
})
class MockHeaderComponent {}

@Component({
  selector: 'cx-page-slot',
  template: 'dynamic-slot.component',
})
class MockDynamicSlotComponent {
  @Input() position: string;
  @Input() isPageFold;
}

@Injectable()
class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of({
      pageId: 'page_uid',
      template: 'LandingPage2Template',
      slots: {
        Section1: {},
        Section2A: {},
        LogoSlot: {},
      },
    });
  }
  getContentSlot(position): Observable<ContentSlotData> {
    return of(slots[position]);
  }
  isLaunchInSmartEdit(): boolean {
    return false;
  }
}

@Injectable()
class MockPageLayoutService {
  readonly customSections$ = new BehaviorSubject<CustomSection[] | null>(null);
  readonly pageFoldSlot$ = new BehaviorSubject<string>('');

  getSlots(section?: string): Observable<string[]> {
    if (section) {
      return of(['LogoSlot']);
    }
    return of(['Section1', 'Section2A']);
  }

  getPageFoldSlot(_pageTemplate: string): Observable<string> {
    return this.pageFoldSlot$;
  }

  get templateName$(): Observable<string> {
    return of('LandingPage2Template');
  }
}

@Injectable()
class MockDeferLoaderService {
  load(_element: HTMLElement, _options?: any) {
    return of(true);
  }
}

class MockDirectiveStateTransferService
  implements Partial<DirectiveStateTransferService>
{
  _data: Record<string, string> = {};

  get(_el: HTMLElement, key: string): string | undefined {
    return this._data[key];
  }
  set(_el: HTMLElement, key: string, value: string): void {
    this._data[key] = value;
  }
  clear(_el: HTMLElement, key: string): void {
    delete this._data[key];
  }
}

describe('PageLayoutComponent', () => {
  let pageLayoutComponent: MockPageTemplateComponent;
  let fixture: ComponentFixture<MockPageTemplateComponent>;
  let pageLayoutService: MockPageLayoutService;
  let layoutComponent: PageLayoutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PageTemplateDirective,
        OutletDirective,
        MockPageTemplateComponent,
        MockHeaderComponent,
      ],
      providers: [
        {
          provide: CmsService,
          useClass: MockCmsService,
        },
        { provide: PageLayoutService, useClass: MockPageLayoutService },
        { provide: DeferLoaderService, useClass: MockDeferLoaderService },
        {
          provide: DirectiveStateTransferService,
          useClass: MockDirectiveStateTransferService,
        },
      ],
    })
      .overrideComponent(PageLayoutComponent, {
        remove: { imports: [PageSlotComponent] },
        add: { imports: [MockDynamicSlotComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockPageTemplateComponent);
    pageLayoutComponent = fixture.componentInstance;
    pageLayoutService = TestBed.inject(
      PageLayoutService
    ) as unknown as MockPageLayoutService;
    layoutComponent = fixture.debugElement.query(
      By.directive(PageLayoutComponent)
    ).componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(pageLayoutComponent).toBeTruthy();
  });

  it('should render two slots based on layout configuration', () => {
    const debugElement = fixture.debugElement;
    const elements = debugElement.queryAll(By.css('cx-page-slot'));
    expect(elements.length).toBe(2);
  });

  it('should render page template as class name on page layout', () => {
    const pageLayoutElement = fixture.debugElement.query(
      By.css('cx-page-layout')
    );
    expect(pageLayoutElement.nativeElement.classList).toContain(
      'LandingPage2Template'
    );
  });

  it('should correctly project the content', () => {
    expect(
      fixture.debugElement.query(By.css('.content')).nativeElement.innerHTML
    ).toContain('content projection');
  });

  describe('custom sections', () => {
    it('should render slots from each custom section instead of normal slots', () => {
      pageLayoutService.customSections$.next(customSections);

      fixture.detectChanges();

      const elements = fixture.debugElement.queryAll(
        By.directive(MockDynamicSlotComponent)
      );
      expect(
        elements.map((element) => element.componentInstance.position)
      ).toEqual(['CustomMainSlot', 'CustomSecondarySlot']);
      expect(
        fixture.debugElement.queryAll(By.css('.custom-section')).length
      ).toBe(2);
    });

    it('should apply grid styles from the custom slot configuration', () => {
      pageLayoutService.customSections$.next(customSections);

      fixture.detectChanges();

      const slot: HTMLElement = fixture.debugElement.query(
        By.directive(MockDynamicSlotComponent)
      ).nativeElement;
      expect(slot.style.gridRowStart).toBe('1');
      expect(slot.style.gridColumnStart).toBe('2');
      expect(slot.style.gridRowEnd).toBe('span 2');
      expect(slot.style.gridColumnEnd).toBe('span 3');
    });

    it('should restore normal slots when custom sections are unavailable', () => {
      pageLayoutService.customSections$.next(customSections);
      fixture.detectChanges();

      pageLayoutService.customSections$.next(null);
      fixture.detectChanges();

      const elements = fixture.debugElement.queryAll(
        By.directive(MockDynamicSlotComponent)
      );
      expect(
        elements.map((element) => element.componentInstance.position)
      ).toEqual(['Section1', 'Section2A']);
      expect(fixture.debugElement.query(By.css('.custom-section'))).toBeNull();
    });

    it('should render no slots for an empty custom template', () => {
      pageLayoutService.customSections$.next([]);

      fixture.detectChanges();

      expect(
        fixture.debugElement.queryAll(By.directive(MockDynamicSlotComponent))
      ).toHaveLength(0);
    });

    it('should preserve page-fold configuration for normal slots', () => {
      pageLayoutService.pageFoldSlot$.next('Section2A');

      fixture.detectChanges();

      const elements = fixture.debugElement.queryAll(
        By.directive(MockDynamicSlotComponent)
      );
      expect(
        elements.map((element) => element.componentInstance.isPageFold)
      ).toEqual([false, true]);
    });
  });

  describe('convertToStyle', () => {
    it('should return grid styles for a valid section item', () => {
      expect(layoutComponent.convertToStyle(customItem)).toEqual({
        'grid-row-start': 1,
        'grid-column-start': 2,
        'grid-row-end': 'span 2',
        'grid-column-end': 'span 3',
      });
    });

    it.each(['rowSpan', 'colSpan'] as const)(
      'should omit grid styles when %s is zero or negative',
      (property) => {
        for (const value of [0, -1]) {
          expect(
            layoutComponent.convertToStyle({ ...customItem, [property]: value })
          ).toEqual({});
        }
      }
    );

    it.each(['rowStart', 'colStart', 'rowSpan', 'colSpan'] as const)(
      'should omit grid styles when %s is NaN',
      (property) => {
        expect(
          layoutComponent.convertToStyle({ ...customItem, [property]: NaN })
        ).toEqual({});
      }
    );
  });
});

describe('SectionLayoutComponent', () => {
  let sectionLayoutComponent: MockHeaderComponent;
  let fixture: ComponentFixture<MockHeaderComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OutletDirective, MockHeaderComponent, MockDynamicSlotComponent],
      providers: [
        {
          provide: CmsService,
          useClass: MockCmsService,
        },
        { provide: PageLayoutService, useClass: MockPageLayoutService },
        { provide: DeferLoaderService, useClass: MockDeferLoaderService },
        {
          provide: DirectiveStateTransferService,
          useClass: MockDirectiveStateTransferService,
        },
      ],
    })
      .overrideComponent(PageLayoutComponent, {
        remove: { imports: [PageSlotComponent] },
        add: { imports: [MockDynamicSlotComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHeaderComponent);
    sectionLayoutComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(sectionLayoutComponent).toBeTruthy();
  });

  it('should render one slot based on layout configuration', () => {
    const debugElement = fixture.debugElement;
    const elements = debugElement.queryAll(By.css('cx-page-slot'));
    expect(elements.length).toBe(1);
  });

  it('should render section as class name on page layout', () => {
    const pageLayoutElement = fixture.debugElement.query(
      By.css('cx-page-layout')
    );
    expect(pageLayoutElement.nativeElement.classList).toContain('header');
  });

  it('should use normal header slots even when custom sections are available', () => {
    const pageLayoutService = TestBed.inject(
      PageLayoutService
    ) as unknown as MockPageLayoutService;
    pageLayoutService.customSections$.next(customSections);

    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(
      By.directive(MockDynamicSlotComponent)
    );
    expect(
      elements.map((element) => element.componentInstance.position)
    ).toEqual(['LogoSlot']);
    expect(fixture.debugElement.query(By.css('.custom-section'))).toBeNull();
  });
});
