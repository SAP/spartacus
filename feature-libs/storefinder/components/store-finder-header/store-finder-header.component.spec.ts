import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  MockTranslationService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { StoreFinderSearchComponent } from '../public_api';
import { StoreFinderHeaderComponent } from './store-finder-header.component';

@Component({
  template: '',
  selector: 'cx-store-finder-search',
})
class MockStoreFinderSearchComponent {}

describe('StoreFinderHeaderComponent', () => {
  let component: StoreFinderHeaderComponent;
  let fixture: ComponentFixture<StoreFinderHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StoreFinderHeaderComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    })
      .overrideComponent(StoreFinderHeaderComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, StoreFinderSearchComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockStoreFinderSearchComponent,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
