import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToggleLinkCellComponent } from '@spartacus/organization/administration/components';
import { IconModule, OutletContextData } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { UnitTreeService } from '../../services/unit-tree.service';
import createSpy = jasmine.createSpy;

const mockContext = {
  expanded: true,
  depthLevel: 1,
  count: 1,
  uid: 'test',
  _field: 'name',
  _type: 'myType',
  name: 'my name',
  code: 'my code',
};

class MockUnitTreeService implements Partial<UnitTreeService> {
  toggle = createSpy('toggle');
}

describe('ToggleLinkCellComponent', () => {
  let component: ToggleLinkCellComponent;
  let unitTreeService: UnitTreeService;
  let fixture: ComponentFixture<ToggleLinkCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleLinkCellComponent],
      imports: [RouterTestingModule, UrlTestingModule, IconModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: { context: mockContext },
        },
        {
          provide: UnitTreeService,
          useClass: MockUnitTreeService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleLinkCellComponent);
    unitTreeService = TestBed.inject(UnitTreeService);
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
    expect(el.innerText).toEqual('my name (1)');
    expect(el.tabIndex).toEqual(0);
  });

  it('should call toggle method', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('button.tree-item-toggle')
    ).nativeNode;
    el.click();
    expect(unitTreeService.toggle).toHaveBeenCalledWith(mockContext);
  });
});
