import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorAttributeNotSupportedComponent } from './configurator-attribute-not-supported.component';

describe('ConfiguratorAttributeNotSupportedComponent', () => {
  let component: ConfiguratorAttributeNotSupportedComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeNotSupportedComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, ConfiguratorAttributeNotSupportedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ConfiguratorAttributeNotSupportedComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should contain 'not supported' text", () => {
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'em',
      'configurator.attribute.notSupported'
    );
  });
});
