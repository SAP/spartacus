import { MaterialModule } from './../../material.module';
import { ConfigService } from './../config.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LanguageSelectorComponent } from './language-selector.component';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from './../shared/store';
import * as fromRoot from '../../routing/store';
import { of } from 'rxjs/observable/of';

class MockConfigService {
  site = {
    language: 'de',
    currency: 'JPY'
  };
}

fdescribe('LanguageSelectorComponent', () => {
  const langauges = ['en', 'de'];
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let store: Store<fromStore.SiteContextState>;
  let el: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            siteContext: combineReducers(fromStore.reducers)
          })
        ],
        declarations: [LanguageSelectorComponent],
        providers: [
          {
            provide: ConfigService,
            useClass: MockConfigService
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(langauges));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain languages button', () => {
    const div = el.query(By.css('div'));
    const button = el.query(By.css('button'));

    // ...
    // after the migrate from Material to Bootstrap is finished, we should test the UI part
  });
});
