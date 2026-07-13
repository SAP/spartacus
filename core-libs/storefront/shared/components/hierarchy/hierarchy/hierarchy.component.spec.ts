import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyComponent } from './hierarchy.component';
import { HierarchyOptions } from './hierarchy.model';
import { CollapsibleNode } from '../hierarchy-node-collapsible';

describe('HierarchyComponent', () => {
  let component: HierarchyComponent;
  let fixture: ComponentFixture<HierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HierarchyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HierarchyComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should merge provided options with defaults on init', () => {
    component.options = {
      tree: new CollapsibleNode('ROOT'),
    } as HierarchyOptions;
    component.ngOnInit();
    expect(component.options.titleReadonly).toBeFalse();
    expect(component.options.collasibleReadonly).toBeFalse();
  });

  it('should initialize hierarchyStyle when options.maxHeight is defined', () => {
    component.options = {
      tree: new CollapsibleNode('ROOT'),
      maxHeight: '200px',
    } as HierarchyOptions;
    component.ngOnInit();
    expect(component.hierarchyStyle).toEqual({
      maxHeight: '200px',
      overflow: 'auto',
    });
  });

  it('should leave hierarchyStyle undefined when options.maxHeight is not defined', () => {
    component.options = {
      tree: new CollapsibleNode('ROOT'),
    } as HierarchyOptions;
    component.ngOnInit();
    expect(component.hierarchyStyle).toBeUndefined();
  });
});
