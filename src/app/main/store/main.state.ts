import { TUserEditableField } from 'app/shared/types/user-editable-field.type';
import { TUser } from '../../shared/types/user.type';

export type TMainState = {
  users: TUser[];
  searchQuery: string;
  userIdToEdit: string | null;
  userFieldToEdit: TUserEditableField | null;
  isLoading: boolean;
};

export const initialMainState: TMainState = {
  users: [],
  searchQuery: '',
  userIdToEdit: '',
  userFieldToEdit: null,
  isLoading: false,
};
