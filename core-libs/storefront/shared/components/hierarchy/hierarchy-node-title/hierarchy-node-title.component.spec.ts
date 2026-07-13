import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyNodeTitleComponent } from './hierarchy-node-title.component';
import { TitleNode } from './title-node.model';
import { HierarchyOptions } from '../hierarchy/hierarchy.model';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';

describe('HierarchyNodeTitleComponent', () => {
  let component: HierarchyNodeTitleComponent;
  let fixture: ComponentFixture<HierarchyNodeTitleComponent>;

  const buildOptions = (
    overrides: Partial<HierarchyOptions<TitleNode>> = {}
  ): HierarchyOptions<TitleNode> =>
    ({
      tree: new TitleNode('Test Title', {
        value: { key: 1, data: [{ code: 'productCode1' }] },
        children: [],
      }),
      ...overrides,
    }) as HierarchyOptions<TitleNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HierarchyNodeTitleComponent],
      imports: [I18nTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HierarchyNodeTitleComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    component.options = buildOptions();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should invoke options.onItemRemove when onItemRemove is called', () => {
    const spy = jasmine.createSpy('onItemRemove');
    component.options = buildOptions({ onItemRemove: spy });

    component.onItemRemove(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should not throw when options.onItemRemove is undefined', () => {
    component.options = buildOptions();
    expect(() => component.onItemRemove(1)).not.toThrow();
  });

  it('should hide the remove button when options.titleReadonly is true', () => {
    component.options = buildOptions({ titleReadonly: true });
    fixture.detectChanges();

    const removeButton = fixture.debugElement.query(By.css('button'));
    expect(removeButton).toBeNull();
  });

  it('should show the remove button when options.titleReadonly is false', () => {
    component.options = buildOptions({ titleReadonly: false });
    fixture.detectChanges();

    const removeButton = fixture.debugElement.query(By.css('button'));
    expect(removeButton).not.toBeNull();
  });
});
