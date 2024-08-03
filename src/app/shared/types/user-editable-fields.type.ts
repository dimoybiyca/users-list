import { TUser } from 'app/shared/types/user.type';

export type TUserEditableFields = Exclude<keyof TUser, 'id'>;
