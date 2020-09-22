import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { OutletContextData } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { ToggleLinkCellComponent } from '@spartacus/my-account/organization/components';
import { UnitListService } from '../../services/unit-list.service';
import { B2bUnitTreeNode } from '@spartacus/core';

const mockContext = {
  _field: 'name',
  _type: 'myType',
  name: 'my name',
  code: 'my code',
};

class MockUnitListService extends UnitListService {
  toggle(_unitNode: B2bUnitTreeNode) {}
}

describe('ToggleLinkCellComponent', () => {
  let component: ToggleLinkCellComponent;
  let fixture: ComponentFixture<ToggleLinkCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleLinkCellComponent],
      imports: [RouterTestingModule, UrlTestingModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: { context: mockContext },
        },
        {
          provide: UnitListService,
          useValue: MockUnitListService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleLinkCellComponent);
    component = fixture.componentInstance;
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
