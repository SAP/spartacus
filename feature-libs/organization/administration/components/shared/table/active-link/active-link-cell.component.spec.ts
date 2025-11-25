import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { I18nTestingModule, UrlPipe } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
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
      ],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 for tabIndex', () => {
    expect(component.tabIndex).toEqual(0);
  });

  it('should render tabindex = 0 by default', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('a')).nativeNode;
    expect(el.tabIndex).toEqual(0);
  });
});
