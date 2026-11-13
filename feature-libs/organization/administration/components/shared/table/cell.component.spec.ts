import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  FeatureToggles,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/url.pipe';
import { of, Subject } from 'rxjs';
import { CellComponent } from './cell.component';

const mockContext: TableDataOutletContext = {
  _field: 'name',
  _type: 'myType',
  _options: {
    cells: {
      name: { linkable: true },
    },
  },
  name: 'my name',
  code: 'my code',
};

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CellComponent, I18nTestingModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context$: of(mockContext),
          },
        },
      ],
    })
      .overrideComponent(CellComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve property', () => {
    expect(component.property).toEqual('my name');
  });

  it('should resolve model', () => {
    expect(component.model).toEqual(mockContext);
  });

  it('should resolve route', () => {
    expect(component.route).toEqual('myTypeDetails');
  });

  it('should resolve route model', () => {
    expect(component.routeModel).toEqual(mockContext);
  });

  it('should render link', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('a')).nativeNode;
    expect(el).toBeTruthy();
  });

  it('should return -1 for tabIndex', () => {
    expect(component.tabIndex).toEqual(-1);
  });

  it('should render tabindex = -1 by default', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('a')).nativeNode;
    expect(el.tabIndex).toEqual(-1);
  });

  it('should render text', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('span.text')
    ).nativeNode;
    expect(el.textContent?.trim()).toEqual('my name');
  });
});

describe('CellComponent delayed outlet context', () => {
  for (const enabled of [false, true]) {
    it(
      'should render delayed context and respect toggle ' + enabled,
      async () => {
        const context$ = new Subject<TableDataOutletContext>();
        await TestBed.configureTestingModule({
          imports: [CellComponent, I18nTestingModule, RouterModule.forRoot([])],
          providers: [
            { provide: OutletContextData, useValue: { context$ } },
            {
              provide: FeatureToggles,
              useValue: { a11yCardNotificationMessage: enabled },
            },
          ],
        })
          .overrideComponent(CellComponent, {
            remove: { imports: [UrlPipe] },
            add: { imports: [MockUrlPipe] },
          })
          .compileComponents();
        const fixture = TestBed.createComponent(CellComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.hasItem).toBe(false);
        context$.next(mockContext);
        await fixture.whenStable();
        expect(fixture.nativeElement.textContent).toContain('my name');
        context$.next({ ...mockContext, name: 'updated name' });
        await fixture.whenStable();
        expect(fixture.componentInstance.property).toBe(
          enabled ? 'updated name' : 'my name'
        );
        expect(fixture.nativeElement.textContent).toContain(
          enabled ? 'updated name' : 'my name'
        );
      }
    );
  }
});
