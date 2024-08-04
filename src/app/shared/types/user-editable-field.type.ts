import { TUser } from 'app/shared/types/user.type';

export type TUserEditableField = Exclude<keyof TUser, 'id'>;
