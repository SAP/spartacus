import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyNodeTitleComponent } from './hierarchy-node-title.component';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { TitleNode } from './title-node.model';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';

describe('HierarchyNodeTitleComponent', () => {
  let component: HierarchyNodeTitleComponent;
  let fixture: ComponentFixture<HierarchyNodeTitleComponent>;
  let mockActiveCartFacade: jasmine.SpyObj<ActiveCartFacade>;

  const mockTree: TitleNode = new TitleNode('Test Title', {
    value: {
      entryGroupNumber: 1,
      entries: [{ code: 'productCode1' }, { code: 'productCode2' }]
    },
    children: [],
  });

  beforeEach(async () => {
    mockActiveCartFacade = jasmine.createSpyObj('ActiveCartFacade', ['removeEntryGroup']);

    await TestBed.configureTestingModule({
      declarations: [HierarchyNodeTitleComponent],
      imports: [
        I18nTestingModule,
      ],
      providers: [
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyNodeTitleComponent);
    component = fixture.componentInstance;
    component.activeCartService = mockActiveCartFacade;
    component.tree = mockTree;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeEntryGroup from ActiveCartFacade when removeBundle is called', () => {
    // Call the removeBundle method
    component.removeBundle(1);

    // Check if removeEntryGroup was called with correct parameter
    expect(mockActiveCartFacade.removeEntryGroup).toHaveBeenCalledWith(1);
  });

  it('should not allow interaction if readonly is true', () => {
    component.readonly = true;
    fixture.detectChanges();

    const removeButton = fixture.debugElement.query(By.css('button.remove'));
    expect(removeButton).toBeNull();
  });
});
