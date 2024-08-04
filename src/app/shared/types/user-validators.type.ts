import { ValidatorFn } from '@angular/forms';
import { TUserEditableField } from 'app/shared/types/user-editable-field.type';

export type TUserValidators = {
  [K in TUserEditableField]: ValidatorFn[];
};
