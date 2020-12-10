import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorAttributeMultiSelectionBundleComponent } from './configurator-attribute-multi-selection-bundle.component';

describe('ConfiguratorAttributeMultiSelectionBundleComponent', () => {
  let component: ConfiguratorAttributeMultiSelectionBundleComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeMultiSelectionBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeMultiSelectionBundleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeMultiSelectionBundleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
