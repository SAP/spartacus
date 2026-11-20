import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  FeatureDirective,
  I18nTestingModule,
  MockTranslatePipe,
  PageMeta,
  PageMetaService,
  TranslatePipe,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { MockFeatureDirective } from '@spartacus/storefront/testing/mock-feature-directive';
import { Observable, of } from 'rxjs';
import { BreadcrumbComponent } from './breadcrumb.component';

class MockPageMetaService {
  getMeta(): Observable<PageMeta> {
    return of(<PageMeta>{
      title: 'Test title',
      description: 'Test description',
    });
  }
}

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BreadcrumbComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: PageMetaService, useClass: MockPageMetaService },
        {
          provide: CmsComponentData,
          useValue: {
            data$: of({}),
          },
        },
      ],
    })
      .overrideComponent(BreadcrumbComponent, {
        add: { imports: [MockFeatureDirective, MockTranslatePipe] },
        remove: { imports: [TranslatePipe, FeatureDirective] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('separates the visible breadcrumb labels from their list positions', () => {
    vi.spyOn(MockTranslatePipe.prototype, 'transform').mockImplementation(
      (key) =>
        key === 'common.of'
          ? 'of'
          : key === 'common.breadcrumbsCurrentPage'
            ? 'Current Page'
            : String(key)
    );
    vi.spyOn(TestBed.inject(PageMetaService), 'getMeta').mockReturnValue(
      of({
        breadcrumbs: [
          { label: 'Home', link: '/' },
          { label: 'Canon', link: '/c/brand_10' },
        ],
      })
    );
    fixture = TestBed.createComponent(BreadcrumbComponent);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('nav a'));
    expect(links[0].attributes['aria-label']).toBe('Home 1 of 2');
    expect(links[1].attributes['aria-label']).toBe('Current Page Canon 2 of 2');
  });
});
