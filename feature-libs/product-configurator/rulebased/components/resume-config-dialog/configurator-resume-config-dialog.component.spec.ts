import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';

import { ConfiguratorResumeConfigDialogComponent } from './configurator-resume-config-dialog.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('ConfiguratorResumeConfigDialogComponent', () => {
  let component: ConfiguratorResumeConfigDialogComponent;
  let fixture: ComponentFixture<ConfiguratorResumeConfigDialogComponent>;
  //let htmlElem: HTMLElement;

  let mockLaunchDialogService: any;

  function initialize() {
    fixture = TestBed.createComponent(ConfiguratorResumeConfigDialogComponent);
    //htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function initializeMocks() {
    mockLaunchDialogService = {
      closeDialog: jasmine.createSpy(),
    };
  }

  beforeEach(async () => {
    beforeEach(
      waitForAsync(() => {
        initializeMocks();
        TestBed.configureTestingModule({
          declarations: [
            ConfiguratorResumeConfigDialogComponent,
            MockCxIconComponent,
            MockKeyboadFocusDirective,
          ],
          imports: [I18nTestingModule],
          providers: [
            { provide: LaunchDialogService, useValue: mockLaunchDialogService },
          ],
        }).compileComponents();
      })
    );

    it('should create component', () => {
      initialize();
      expect(component).toBeDefined();
    });
  });
});
