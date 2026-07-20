import { CommonModule } from '@angular/common';
import { Component, Injectable, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmsService, ContentSlotData, Page } from '@spartacus/core';
import { TestModule } from 'core-libs/core/src/config/services/configuration.service.spec';
import { Observable, of } from 'rxjs';
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
  template: ` <cx-page-layout section="header"> </cx-page-layout> `,
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
  getSlots(section?: string): Observable<string[]> {
    if (section) {
      return of(['LogoSlot']);
    }
    return of(['Section1', 'Section2A']);
  }

  getPageFoldSlot(_pageTemplate: string): Observable<string> {
    return of('');
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PageTemplateDirective,
        CommonModule,
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
      .overrideComponent(MockPageTemplateComponent, {
        remove: { imports: [PageSlotComponent] },
        add: {
          imports: [MockDynamicSlotComponent, MockPageTemplateComponent],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockPageTemplateComponent);
    pageLayoutComponent = fixture.componentInstance;
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
});

describe('SectionLayoutComponent', () => {
  let sectionLayoutComponent: MockHeaderComponent;
  let fixture: ComponentFixture<MockHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
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
    }).compileComponents();
  }));

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
});
