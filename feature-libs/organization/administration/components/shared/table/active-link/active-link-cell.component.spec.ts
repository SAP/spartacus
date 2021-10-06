import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { OutletContextData } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { ActiveLinkCellComponent } from '..';

const mockContext = {
  _field: 'name',
  _type: 'myType',
  _options: {},
  name: 'my name',
  code: 'my code',
};

describe('ActiveLinkCellComponent', () => {
  let component: ActiveLinkCellComponent;
  let fixture: ComponentFixture<ActiveLinkCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveLinkCellComponent],
      imports: [RouterTestingModule, UrlTestingModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: { context: mockContext },
        },
      ],
    }).compileComponents();
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
