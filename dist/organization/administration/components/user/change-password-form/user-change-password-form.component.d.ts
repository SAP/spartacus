import { UntypedFormGroup } from '@angular/forms';
import { User } from '@spartacus/core';
import { Observable } from 'rxjs';
import { MessageService } from '../../shared/message/services/message.service';
import { UserItemService } from '../services/user-item.service';
import { UserChangePasswordFormService } from './user-change-password-form.service';
import * as i0 from "@angular/core";
export declare class UserChangePasswordFormComponent {
    protected itemService: UserItemService;
    protected formService: UserChangePasswordFormService;
    protected messageService: MessageService;
    form$: Observable<UntypedFormGroup | null>;
    constructor(itemService: UserItemService, formService: UserChangePasswordFormService, messageService: MessageService);
    save(form: UntypedFormGroup): void;
    protected notify(item: User): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserChangePasswordFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserChangePasswordFormComponent, "cx-org-user-change-password-form", never, {}, {}, never, never, false, never>;
}
