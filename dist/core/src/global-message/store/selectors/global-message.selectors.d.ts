import { MemoizedSelector } from '@ngrx/store';
import { Translatable } from '../../../i18n/translatable';
import { GlobalMessageType } from '../../models/global-message.model';
import { GlobalMessageEntities, StateWithGlobalMessage } from '../global-message-state';
export declare const getGlobalMessageEntities: MemoizedSelector<StateWithGlobalMessage, GlobalMessageEntities>;
export declare const getGlobalMessageEntitiesByType: (type: GlobalMessageType) => MemoizedSelector<StateWithGlobalMessage, Translatable[]>;
export declare const getGlobalMessageCountByType: (type: GlobalMessageType) => MemoizedSelector<StateWithGlobalMessage, number>;
