import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { of } from 'rxjs';
import { CdsConfig } from '../../config/config.model';
import { QualtricsConfig } from './config/qualtrics-config';
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
    let service: ProfileTagInjector;
    let winRef: WindowRef;

    const nativeWindow: ProfileTagWindowObject = {
        Y_TRACKING: {
            push: jasmine.createSpy('push'),
        }
    }
    const mockWindowRef = {
        nativeWindow
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProfileTagInjector,
                { provide: QualtricsConfig, useValue: mockCDSConfig },
                { provide: WindowRef, useValue: mockWindowRef },
            ],
        });

        winRef = TestBed.get(WindowRef as Type<WindowRef>);
        service = TestBed.get(ProfileTagInjector as Type<
            ProfileTagInjector
        >);

        spyOn(winRef.nativeWindow['QSI'].API, 'unload').and.stub();
        spyOn(winRef.nativeWindow['QSI'].API, 'load').and.callThrough();
        spyOn(winRef.nativeWindow['QSI'].API, 'run').and.stub();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have qualtrics enabled', () => {
        expect(winRef.nativeWindow['QSI']).toBeDefined();
    });

    describe('load', () => {
        describe('when isDataLoaded() returns true', () => {
            it('should call Qualtrics API', () => {
                spyOn<any>(service, 'isDataLoaded').and.returnValue(of(true));

                service['qualtricsLoaded$'].next(true);
                let result = false;
                service
                    .load()
                    .subscribe(value => (result = value))
                    .unsubscribe();

                expect(result).toEqual(true);
                expect(winRef.nativeWindow['QSI'].API.unload).toHaveBeenCalled();
                expect(winRef.nativeWindow['QSI'].API.load).toHaveBeenCalled();
                expect(winRef.nativeWindow['QSI'].API.run).toHaveBeenCalled();
            });
        });
    });
