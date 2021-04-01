import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, PageMeta, PageMetaService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { PageTitleComponent } from './page-title.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

class MockPageMetaService {
  getMeta(): Observable<PageMeta> {
    return of(<PageMeta>{
      title: 'Test title',
      description: 'Test description',
    });
  }
}

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [PageTitleComponent],
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
    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title$', () => {
    it('should set title in ngOnInit', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(
        el.query(By.css('h1.cx-visually-hidden')).nativeElement.innerText
      ).toEqual('Test title');
    });
  });
});
