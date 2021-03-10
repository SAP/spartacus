import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorCartEntryBundleInfoComponent } from './configurator-cart-entry-bundle-info.component';

describe('ConfiguratorCartEntryBundleInfoComponent', () => {
  let component: ConfiguratorCartEntryBundleInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCartEntryBundleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguratorCartEntryBundleInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorCartEntryBundleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
