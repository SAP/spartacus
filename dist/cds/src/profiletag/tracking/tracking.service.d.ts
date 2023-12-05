import { ProfileTagLifecycleService } from '../services/profile-tag-lifecycle.service';
import { ProfileTagPushEventsService } from '../services/profile-tag-push-events.service';
import { ProfileTagEventService } from '../services/profiletag-event.service';
import * as i0 from "@angular/core";
export declare class TrackingService {
    protected profileTagLifecycleService: ProfileTagLifecycleService;
    protected profileTagPushEventsService: ProfileTagPushEventsService;
    private profileTagEventTracker;
    constructor(profileTagLifecycleService: ProfileTagLifecycleService, profileTagPushEventsService: ProfileTagPushEventsService, profileTagEventTracker: ProfileTagEventService);
    static factory(trackingService: TrackingService): () => void;
    trackEvents(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrackingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TrackingService>;
}
