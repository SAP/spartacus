import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorShowMoreComponent } from './configurator-show-more.component';
import { I18nTestingModule } from '@spartacus/core';

describe('ConfiguratorShowMoreComponent', () => {
  let component: ConfiguratorShowMoreComponent;
  let fixture: ComponentFixture<ConfiguratorShowMoreComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ConfiguratorShowMoreComponent],
      })
        .overrideComponent(ConfiguratorShowMoreComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorShowMoreComponent);
    component = fixture.componentInstance;

    component.text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showMore$ after view init', () => {
    component.ngAfterViewInit();
    expect(component.showMore$.getValue()).toBe(true);
  });

  it('should set showHiddenText$ after toggleShowMore action', () => {
    component.ngAfterViewInit();
    component.toggleShowMore();
    expect(component.showHiddenText$.getValue()).toBe(true);
  });
});
