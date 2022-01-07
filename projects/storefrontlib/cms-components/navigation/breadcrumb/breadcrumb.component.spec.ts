import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, PageMeta, PageMetaService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [BreadcrumbComponent],
        providers: [
          { provide: PageMetaService, useClass: MockPageMetaService },
          {
            provide: CmsComponentData,
            useValue: {
              data$: of({}),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
