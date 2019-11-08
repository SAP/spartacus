import { TestBed } from '@angular/core/testing';
import { Event as NgRouterEvent, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AnonymousConsentsService, BaseSiteService, WindowRef } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { CdsConfig } from '../../config/config.model';
import { ProfileTagInjector } from './profile-tag.injector';
import { ProfileTagWindowObject } from './profile-tag.model';


const mockCDSConfig: CdsConfig = {
    cds: {
        profileTag: {
            tenant: "ArgoTest",
            siteId: "electronics-test",
            javascriptUrl: 'https://tag.static.eu.context.cloud.sap',
            configUrl: "https://tag.static.us.context.cloud.sap",
            allowInsecureCookies: false,
            gtmId: "test-id-1234567",
        }
    }
};


describe('ProfileTagInjector', () => {
    let profileTagInjector: ProfileTagInjector;
    let nativeWindow: ProfileTagWindowObject;
    let getActiveBehavior;
    let baseSiteService;
    let appendChildSpy;
    let createElementSpy;
    let getElementsByTagNameSpy;
    let getConsentsBehavior;
    let isConsentGivenValue;
    let routerEventsBehavior;
    let router;
    let anonymousConsentsService;
    let mockedWindowRef;
    function setVariables() {
        getActiveBehavior = new BehaviorSubject<String>('');
        getConsentsBehavior = new BehaviorSubject<Object>([1]);
        isConsentGivenValue = false;
        appendChildSpy = jasmine.createSpy('appendChildSpy');
        routerEventsBehavior = new BehaviorSubject<NgRouterEvent>(new NavigationStart(0, 'test.com', 'popstate'));
        anonymousConsentsService = {
            getConsents: () => getConsentsBehavior,
            isConsentGiven: () => isConsentGivenValue
        }
        router = {
            events: routerEventsBehavior
        }
        mockedWindowRef = {
            nativeWindow: {
                Y_TRACKING: {
                    push: jasmine.createSpy('push'),
                }
            },
            document: {
                createElement: () => ({}),
                getElementsByTagName: () => {
                    return [{
                        appendChild: appendChildSpy
                    }]
                }
            }
        };
        baseSiteService = {
            getActive: () => getActiveBehavior
        }
        createElementSpy = spyOn(mockedWindowRef.document, 'createElement').and.callThrough();
        getElementsByTagNameSpy = spyOn(mockedWindowRef.document, 'getElementsByTagName').and.callThrough();
    }
    beforeEach(() => {
        setVariables();
        TestBed.configureTestingModule({
            providers: [
                ProfileTagInjector,
                { provide: CdsConfig, useValue: mockCDSConfig },
                { provide: WindowRef, useValue: mockedWindowRef },
                { provide: BaseSiteService, useValue: baseSiteService },
                { provide: Router, useValue: router },
                { provide: AnonymousConsentsService, useValue: anonymousConsentsService }
            ],
        });

        profileTagInjector = TestBed.get(ProfileTagInjector);
        nativeWindow = TestBed.get(WindowRef).nativeWindow;
    });

    it('should be created', () => {
        expect(profileTagInjector).toBeTruthy();
    });

    it('Should first wait for the basesite to be active before doing anything', () => {
        const profileTagLoaded$ = profileTagInjector.injectScript();
        profileTagLoaded$.subscribe().unsubscribe();

        expect(getElementsByTagNameSpy).toHaveBeenCalled();
        expect(createElementSpy).toHaveBeenCalled();
        expect(appendChildSpy).toHaveBeenCalled();
        expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
        expect(nativeWindow.Y_TRACKING.q).not.toBeDefined();
    });

    it(`Should add config parameters to the q array after the base site is active`, () => {
        const profileTagLoaded$ = profileTagInjector.injectScript();
        const subscription = profileTagLoaded$.subscribe();
        getActiveBehavior.next('electronics-test');
        subscription.unsubscribe();

        expect(nativeWindow.Y_TRACKING.q[0][0])
            .toEqual({ ...mockCDSConfig.cds.profileTag, spa: true, profileTagEventReciever: jasmine.anything() });
        expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
    });

    it(`Should not call the push method if the event receiver callback hasn't been called`, () => {
        const profileTagLoaded$ = profileTagInjector.injectScript();
        const subscription = profileTagLoaded$.subscribe();
        getActiveBehavior.next('electronics-test');
        routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
        getConsentsBehavior.next([1, 2, 3])
        subscription.unsubscribe();

        expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
    })

    it(`Should call the push method it the site is active,
     and event receiver callback has been called with loaded`, () => {
        const profileTagLoaded$ = profileTagInjector.injectScript();
        const subscription = profileTagLoaded$.subscribe();
        getActiveBehavior.next('electronics-test');
        nativeWindow.Y_TRACKING.q[0][0].profileTagEventReciever({ eventName: 'Loaded' });
        routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
        subscription.unsubscribe();

        expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalled();
        expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledWith({ event: 'Navigated' });
    })
    it(`Should call the push method if all consents change to true,
    and ignore all further changes, only sending one consent changed event`, () => {
        // TODO: For now we dont trigger a consent withdrawn as we do not do
        // granular consents, and one consent withdrawn would lead all tracking to stop
        const profileTagLoaded$ = profileTagInjector.injectScript();
        const subscription = profileTagLoaded$.subscribe();
        getActiveBehavior.next('electronics-test');
        nativeWindow.Y_TRACKING.q[0][0].profileTagEventReciever({ eventName: 'Loaded' });
        isConsentGivenValue = true;
        getConsentsBehavior.next([1, 2, 3])
        getConsentsBehavior.next([1, 2, 3])
        getConsentsBehavior.next([1, 2, 3])
        isConsentGivenValue = false;
        getConsentsBehavior.next([1, 2, 3])
        getConsentsBehavior.next([3, 2, 3])
        getConsentsBehavior.next([3, 2, 3])
        isConsentGivenValue = true;
        getConsentsBehavior.next([1, 2, 3])
        subscription.unsubscribe();

        expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledTimes(1);
        expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledWith({ event: 'ConsentChanged', granted: true });
    })

    it(`Should call the push method for every NavigationEnd event, 
    regardless of consent status, and even if the consent pipe ends`, () => {
        const profileTagLoaded$ = profileTagInjector.injectScript();
        const subscription = profileTagLoaded$.subscribe();
        getActiveBehavior.next('electronics-test');
        nativeWindow.Y_TRACKING.q[0][0].profileTagEventReciever({ eventName: 'Loaded' });
        isConsentGivenValue = true;
        getConsentsBehavior.next([1, 2, 3])
        isConsentGivenValue = false;
        getConsentsBehavior.next([1, 2, 3])
        isConsentGivenValue = true;
        getConsentsBehavior.next([1, 2, 3])
        routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'))
        routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'))
        routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test2'))
        routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test3'))
        routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test1'))
        subscription.unsubscribe();
        expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledTimes(6);
        expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledWith({ event: 'Navigated' });
    })

});