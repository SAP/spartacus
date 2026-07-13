import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyNodeCollapsibleComponent } from './hierarchy-node-collapsible.component';
import { CollapsibleNode } from './collapsible-node.model';
import { HierarchyOptions } from '../hierarchy/hierarchy.model';
import { I18nTestingModule } from '@spartacus/core';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';

describe('HierarchyNodeCollapsibleComponent', () => {
  let component: HierarchyNodeCollapsibleComponent<any>;
  let fixture: ComponentFixture<HierarchyNodeCollapsibleComponent<any>>;

  const buildOptions = (
    tree: CollapsibleNode<any>,
    overrides: Partial<HierarchyOptions<any>> = {}
  ): HierarchyOptions<any> =>
    ({ tree, ...overrides }) as HierarchyOptions<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconModule],
      declarations: [HierarchyNodeCollapsibleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HierarchyNodeCollapsibleComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    component.options = buildOptions(new CollapsibleNode('Test Node'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should reflect the tree open state via the open getter', () => {
    const tree = new CollapsibleNode('Test Node', { open: true });
    component.options = buildOptions(tree);
    expect(component.open).toBeTruthy();

    tree.open = false;
    expect(component.open).toBeFalsy();
  });

  it('should toggle open state when toggle() is called and node is not disabled', () => {
    const tree = new CollapsibleNode('Test Node', {
      open: false,
      disabled: false,
    });
    component.options = buildOptions(tree);

    component.toggle();
    expect(tree.open).toBeTruthy();

    component.toggle();
    expect(tree.open).toBeFalsy();
  });

  it('should not toggle open state when node is disabled', () => {
    const tree = new CollapsibleNode('Test Node', {
      open: false,
      disabled: true,
    });
    component.options = buildOptions(tree);

    component.toggle();
    expect(tree.open).toBeFalsy();
  });

  it('should return collapsible children from the tree', () => {
    const tree = new CollapsibleNode('Test Node', { children: [] });
    component.options = buildOptions(tree);
    expect(component.collapsibleChildren).toEqual([]);
  });

  it('should invoke options.onItemEdit when onItemEdit is called', () => {
    const spy = jasmine.createSpy('onItemEdit');
    component.options = buildOptions(new CollapsibleNode('Test Node'), {
      onItemEdit: spy,
    });

    component.onItemEdit(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should not throw when options.onItemEdit is undefined', () => {
    component.options = buildOptions(new CollapsibleNode('Test Node'));
    expect(() => component.onItemEdit(1)).not.toThrow();
  });
});
