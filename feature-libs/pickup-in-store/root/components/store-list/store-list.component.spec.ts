import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { StoreFinderModule } from '@spartacus/storefinder';
import { StoreEntities, StoreFinderService } from '@spartacus/storefinder/core';
import { of } from 'rxjs';
import { StoreListComponent } from './store-list.component';

class MockStoreFinderService implements Partial<StoreFinderService> {
  getFindStoresEntities() {
    return of<StoreEntities>();
  }
  getStoresLoading() {
    return of(false);
  }
  findStoresAction() {}
}

describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;
  let storeFinderService: StoreFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        RouterTestingModule,
        StoreFinderModule,
      ],
      declarations: [StoreListComponent],
      providers: [
        { provide: StoreFinderService, useClass: MockStoreFinderService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    storeFinderService = TestBed.inject(StoreFinderService);

    fixture.detectChanges();
  });

  it('should create store list', () => {
    expect(component).toBeDefined();
  });

  it('should get local stores on init', () => {
    spyOn(storeFinderService, 'getFindStoresEntities');
    spyOn(storeFinderService, 'getStoresLoading');
    spyOn(storeFinderService, 'findStoresAction');
    component.ngOnInit();
    expect(storeFinderService.getStoresLoading).toHaveBeenCalled();
    expect(storeFinderService.getFindStoresEntities).toHaveBeenCalled();
    expect(storeFinderService.findStoresAction).toHaveBeenCalled();
  });
});
