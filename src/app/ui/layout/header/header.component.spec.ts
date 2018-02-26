import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { LoginModule } from '../../../auth/components/login/login.module';
import { SiteContextModule } from '../../../site-context/site-context.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromUserStore from '../../../auth/store';
import * as fromCMSStore from '../../../cms/store';

import { EffectsModule } from '@ngrx/effects';
import { OccSiteService } from '../../../newocc/site-context/occ-site.service';

class MockOccSiteService {
  loadLanguages() {
    return;
  }

  loadCurrencies() {
    return;
  }
}

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          LoginModule,
          SiteContextModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCMSStore.reducers),
            user: combineReducers(fromUserStore.reducers)
          }),
          EffectsModule.forRoot([])
        ],
        declarations: [
          HeaderComponent,
          DynamicSlotComponent,
          ComponentWrapperComponent
        ],
        providers: [{ provide: OccSiteService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });
});
