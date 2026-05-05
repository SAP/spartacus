import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyComponent } from './hierarchy.component';
import { HierarchyNode } from '../hierarchy-node/hierarchy-node.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { TemplateRef } from '@angular/core';

describe('HierarchyComponent', () => {
  let component: HierarchyComponent;
  let fixture: ComponentFixture<HierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HierarchyComponent],
      providers: [{ provide: ActiveCartFacade, useValue: {} }], // Mock ActiveCartFacade
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize hierarchyStyle with maxHeight when defined', () => {
    component.maxHeight = '200px';
    component.ngOnInit();
    expect(component.hierarchyStyle).toEqual({
      maxHeight: '200px',
      overflow: 'auto',
    });
  });

  it('should set the tree input property correctly', () => {
    const mockTree: HierarchyNode<any> = {
      name: 'Root',
      children: [],
      disabled: false,
      hidden: false,
    };
    component.tree = mockTree;
    expect(component.tree).toEqual(mockTree);
  });

  it('should set the disabled input property correctly', () => {
    component.disabled = true;
    expect(component.disabled).toBeTruthy();
  });

  it('should set the titleReadonly input property correctly', () => {
    component.titleReadonly = true;
    expect(component.titleReadonly).toBeTruthy();
  });

  it('should set the collasibleReadonly input property correctly', () => {
    component.collasibleReadonly = true;
    expect(component.collasibleReadonly).toBeTruthy();
  });

  it('should set the template input property correctly', () => {
    const mockTemplate: TemplateRef<any> = {} as TemplateRef<any>;
    component.template = mockTemplate;
    expect(component.template).toEqual(mockTemplate);
  });

  it('should set the activeCartService input property correctly', () => {
    const mockActiveCartService: ActiveCartFacade = {} as ActiveCartFacade;
    component.activeCartService = mockActiveCartService;
    expect(component.activeCartService).toEqual(mockActiveCartService);
  });
});
