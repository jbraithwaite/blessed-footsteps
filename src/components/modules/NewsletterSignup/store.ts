import { isRight, Right } from 'fp-ts/lib/Either';
import { failure, getDefaultContext, success, Validation } from 'io-ts';
import React from 'react';
import {
  useInput,
  email as emailKind,
  string,
  boolean,
  InputsOf,
} from 'components/form/helpers';

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
  validate: () => Validation<FormResult>;
}

export function useStore(): NewsletterStore {
  const [errors, setErrors] = React.useState<string[]>([]);

  const firstName = useInput(string);
  const lastName = useInput(string);
  const email = useInput(emailKind);
  const updatesDaily = useInput(boolean, { initial: true });
  const updatesBook = useInput(boolean, { initial: true });

  const fields = React.useMemo(
    () => ({ firstName, lastName, email, updatesDaily, updatesBook }),
    [email, firstName, lastName, updatesBook, updatesDaily],
  );

  const hasSelectedUpdate =
    updatesDaily.inputProps.value === 'true' ||
    updatesBook.inputProps.value === 'true';

  React.useEffect(() => {
    if (hasSelectedUpdate) {
      setErrors([]);
    }
  }, [hasSelectedUpdate]);

  const validate: () => Validation<FormResult> = React.useCallback(() => {
    setErrors([]);
    const context = getDefaultContext({} as any);
    const entries = Object.entries(fields);
    const validations = entries.map<[string, Validation<unknown>]>(
      ([key, input]) => [key, input.validate()],
    );

    if (!hasSelectedUpdate) {
      setErrors(['Select which updates to receive']);
      return failure(undefined, context);
    } else if (
      validations.every((entry): entry is [string, Right<unknown>] =>
        isRight(entry[1]),
      )
    ) {
      return success(
        Object.fromEntries(
          validations.map(([key, validation]) => [key, validation.right]),
        ) as FormResult,
      );
    } else {
      return failure(undefined, context);
    }
  }, [fields, hasSelectedUpdate]);

  return {
    fields,
    errors,
    validate,
  };
}
