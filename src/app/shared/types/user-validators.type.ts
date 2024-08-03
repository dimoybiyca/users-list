import { ValidatorFn } from '@angular/forms';
import { TUserEditableFields } from 'app/shared/types/user-editable-fields.type';

export type TUserValidators = {
  [K in TUserEditableFields]: ValidatorFn[];
};
