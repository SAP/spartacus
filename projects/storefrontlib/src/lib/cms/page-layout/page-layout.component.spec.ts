import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgModule, Component, Input } from '@angular/core';
import { CmsService, Page, ContentSlotData } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PageLayoutService } from './page-layout.service';
import { PageLayoutComponent } from './page-layout.component';
import { CommonModule } from '@angular/common';
import { OutletDirective } from '../../outlet';

const slots = {
  Section1: {
    uid: 'Section1',
    components: []
  }
};

@Component({
  selector: 'cx-page-template-test',
  template: `
    <cx-page-layout>
      <div class="content">content projection</div>
    </cx-page-layout>
  `
})
export class MockPageTemplateComponent {}

@Component({
  selector: 'cx-page-header-test',
  template: `
    <cx-page-layout section="header"> </cx-page-layout>
  `
})
export class MockHeaderComponent {}

@Component({
  selector: 'cx-page-slot',
  template: 'dynamic-slot.component'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

export class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of({
      uid: 'page_uid',
      template: 'LandingPage2Template',
      slots: {
        Section1: {
          uid: 'Section1'
        },
        Section2A: {
          uid: 'Section1'
        },
        LogoSlot: {
          uid: 'LogoSlot'
        }
      }
    });
  }
  getContentSlot(position): Observable<ContentSlotData> {
    return of(slots[position]);
  }
  isLaunchInSmartEdit(): boolean {
    return false;
  }
}

export class MockPageLayoutService {
  getSlots(section?: string): Observable<string[]> {
    if (section) {
      return of(['LogoSlot']);
    }
    return of(['Section1', 'Section2A']);
  }
  get templateName$(): Observable<string> {
    return of('LandingPage2Template');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    PageLayoutComponent,
    MockDynamicSlotComponent,
    MockPageTemplateComponent,
    MockHeaderComponent,
    OutletDirective
  ],
  providers: [
    {
      provide: CmsService,
      useClass: MockCmsService
    },
    { provide: PageLayoutService, useClass: MockPageLayoutService }
  ]
})
export class TestModule {}

describe('PageLayoutComponent', () => {
  let pageLayoutComponent: MockPageTemplateComponent;
  let fixture: ComponentFixture<MockPageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    }).compileComponents();
  }));

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
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
