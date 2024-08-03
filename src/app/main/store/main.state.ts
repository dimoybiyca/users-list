import { TUser } from '../../shared/types/user.type';

export type TMainState = {
  users: TUser[];
  searchQuery: string;
  isLoading: boolean;
};

export const initialMainState: TMainState = {
  users: [],
  searchQuery: '',
  isLoading: false,
};
