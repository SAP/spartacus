import { Member } from './member.model';

export interface UserGroup {
  members?: Array<Member>;
  membersCount?: number;
  name?: string;
  subGroups?: Array<UserGroup>;
  uid?: string;
}
