export interface AsmUi {
  collapsed?: boolean;
}

export interface Member {
  name?: string;
  uid?: string;
}

export interface UserGroup {
  members?: Array<Member>;
  membersCount?: number;
  name?: string;
  subGroups?: Array<UserGroup>;
  uid?: string;
}

