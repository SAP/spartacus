import { Component, ComponentFactory, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InlineRenderStrategy } from './inline-render-strategy.service';

const testTemplate = {} as ComponentFactory<any>;

@Component({
  template: '',
})
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

describe('InlineRenderStrategy', () => {
  let service: InlineRenderStrategy;
  let component: TestContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InlineRenderStrategy],
      declarations: [TestContainerComponent],
    }).compileComponents();

    service = TestBed.get(InlineRenderStrategy);
    component = TestBed.createComponent(TestContainerComponent)
      .componentInstance;

    spyOn(component.vcr, 'createComponent');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create component in the container ref', () => {
    service.render(testTemplate, component.vcr);

    expect(component.vcr.createComponent).toHaveBeenCalledWith(testTemplate);
  });
});
