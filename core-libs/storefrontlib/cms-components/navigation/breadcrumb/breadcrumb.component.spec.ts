import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { MockFeatureDirective } from '@spartacus/storefront';
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

  beforeEach(waitForAsync(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
