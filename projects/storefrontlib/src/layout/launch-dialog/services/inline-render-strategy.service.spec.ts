import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LaunchConfig, LaunchInlineDialog, LAUNCH_CALLER } from '../config';
import { InlineRenderStrategy } from './inline-render-strategy.service';

const testTemplate = {} as ComponentFactory<any>;

@Component({
  template: '',
})
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

const mockLaunchConfig: LaunchConfig = {
  launch: {
    TEST_INLINE: {
      default: {
        inline: true,
        component: TestContainerComponent,
      },
    },
    TEST_OUTLET: {
      default: {
        outlet: 'cx-outlet-test',
        component: TestContainerComponent,
      },
    },
  },
};

class MockComponentFactoryResolver {
  resolveComponentFactory() {
    return testTemplate;
  }
}

describe('InlineRenderStrategy', () => {
  let service: InlineRenderStrategy;
  let component: TestContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InlineRenderStrategy,
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
      ],
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

  describe('render', () => {
    it('should create component in the container ref', () => {
      const config = mockLaunchConfig.launch['TEST_INLINE']
        .default as LaunchInlineDialog;
      service.render(config, 'TEST_INLINE' as LAUNCH_CALLER, component.vcr);

      expect(component.vcr.createComponent).toHaveBeenCalledWith(testTemplate);
    });
  });

  describe('match', () => {
    it('should return TRUE for an inline config', () => {
      const config = mockLaunchConfig.launch['TEST_INLINE']
        .default as LaunchInlineDialog;
      expect(service.match(config)).toBeTruthy();
    });

    it('should return FALSE for a different config', () => {
      const config = mockLaunchConfig.launch['TEST_OUTLET']
        .default as LaunchInlineDialog;
      expect(service.match(config)).toBeFalsy();
    });
  });
});
