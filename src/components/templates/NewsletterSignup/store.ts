import { InputsOf, useFormInput, ValidationResult } from '@hooks/useFormInput';
import { booleanC, emailC, stringC } from '@utils/codex';
import { defined } from '@utils/function';
import React from 'react';

type FormResult = {
  firstName: string;
  lastName: string;
  email: string;
  updatesDaily: boolean;
  updatesBook: boolean;
};

export interface NewsletterStore {
  fields: InputsOf<FormResult>;
  errors: string[];
  validate: () => ValidationResult<FormResult>;
}

export function useStore(): NewsletterStore {
  const [errors, setErrors] = React.useState<string[]>([]);

  const fields = useFields();

  const hasSelectedUpdate =
    fields.updatesDaily.inputProps.value === 'true' ||
    fields.updatesBook.inputProps.value === 'true';

  React.useEffect(() => {
    if (hasSelectedUpdate) {
      setErrors([]);
    }
  }, [hasSelectedUpdate]);

  const validate: () => ValidationResult<FormResult> = React.useCallback(() => {
    setErrors([]);

    const entries = Object.entries(fields);
    const validations = entries.map<[string, ValidationResult<unknown>]>(
      ([key, input]) => [key, input.validate()],
    );

    if (!hasSelectedUpdate) {
      setErrors(['Select what kind of updates you want.']);
      return { success: false };
    }

    if (validations.some(([, validation]) => !validation.success)) {
      return { success: false };
    } else {
      const data = Object.fromEntries(
        validations
          .map(([field, validation]) =>
            validation.success ? [field, validation.data] : undefined,
          )
          .filter(defined),
      ) as FormResult;
      return { success: true, data };
    }
  }, [fields, hasSelectedUpdate]);

  return {
    fields,
    errors,
    validate,
  };
}

function useFields(): InputsOf<FormResult> {
  const firstName = useFormInput(stringC(), { required: true });
  const lastName = useFormInput(stringC(), { required: true });
  const email = useFormInput(emailC(), { required: true });
  const updatesDaily = useFormInput(booleanC(), { initial: true });
  const updatesBook = useFormInput(booleanC(), { initial: true });

  return { firstName, lastName, email, updatesDaily, updatesBook };
}
