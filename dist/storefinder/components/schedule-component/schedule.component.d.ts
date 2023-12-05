import { OnInit } from '@angular/core';
import { PointOfService, WeekdayOpeningDay } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ScheduleComponent implements OnInit {
    location: PointOfService;
    weekDays: WeekdayOpeningDay[];
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScheduleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScheduleComponent, "cx-schedule", never, { "location": "location"; }, {}, never, ["*"], false, never>;
}
