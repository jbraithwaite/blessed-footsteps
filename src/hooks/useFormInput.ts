import { isNonEmpty } from '@utils/array';
import * as z from 'zod';
import * as React from 'react';
import { pluck } from '@utils/function';
import { logger } from '@utils/logger';

export interface FormInput<T> {
  validate: (options?: ValidationOptions) => ValidationResult<T>;
  reset: () => void;
  value: string;
  formGroupProps: {
    errors: string[];
  };
  inputProps: {
    value: string;
    required: boolean;
    error: boolean;
    onChange: (value: string) => void;
  };
}

export type ValidationOptions = {
  // Validate without presenting errors
  silent?: boolean;
};

export type ValidationSuccess<T> = {
  success: true;
  data: T;
};

export type ValidationError = {
  success: false;
};

export type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

export type InputsOf<T> = {
  [P in keyof T]-?: T[P] extends Record<string, unknown>
    ? InputsOf<T[P]>
    : FormInput<T[P]>;
};

export function useFormInput<
  T extends z.ZodNumber | z.ZodString | z.ZodDate | z.ZodBoolean,
  Required extends boolean = true,
>(
  schema: T,
  options: { initial?: z.infer<typeof schema>; required?: Required } = {},
): FormInput<
  Required extends false
    ? z.infer<typeof schema> | undefined
    : z.infer<typeof schema>
> {
  const initialValueValidator = schema.safeParse(options.initial);

  const initialValue = initialValueValidator.success
    ? dataToString(initialValueValidator.data)
    : '';

  const [errors, setErrors] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string>(initialValue);

  const required = options.required !== false;

  const clearErrors = (): void => {
    if (isNonEmpty(errors)) {
      setErrors([]);
    }
  };

  const onChange = (v: string): void => {
    setValue(v);
    clearErrors();
  };

  const reset = (): void => {
    setValue(initialValue);
    clearErrors();
  };

  const validate = ({ silent }: ValidationOptions = {}): ValidationResult<
    Required extends false
      ? z.infer<typeof schema> | undefined
      : z.infer<typeof schema>
  > => {
    const optionalSchema =
      options.required === false ? z.optional(schema) : schema;

    const validation = optionalSchema.safeParse(stringToData(value, schema));

    if (!silent) {
      clearErrors();

      if (!validation.success) {
        setErrors(validation.error.issues.map(pluck('message')));

        logger.info('Validation failed', {
          extra: { error: validation.error },
        });
      }
    }

    return validation.success
      ? {
          success: true,
          data: validation.data as any,
        }
      : { success: false };
  };

  return {
    validate,
    reset,
    value,
    formGroupProps: {
      errors,
    },
    inputProps: {
      value,
      required,
      error: isNonEmpty(errors),
      onChange,
    },
  };
}

function stringToData<
  T extends z.ZodNumber | z.ZodString | z.ZodDate | z.ZodBoolean,
>(string: string, schema: T): Date | number | boolean | string | undefined {
  return string === ''
    ? undefined
    : schema._def.typeName === z.ZodFirstPartyTypeKind.ZodNumber
    ? Number(string)
    : schema._def.typeName === z.ZodFirstPartyTypeKind.ZodDate
    ? new Date(string)
    : schema._def.typeName === z.ZodFirstPartyTypeKind.ZodBoolean
    ? Boolean(string)
    : string;
}
function dataToString(
  data: Date | number | boolean | string | undefined,
): string {
  if (data instanceof Date) {
    return data.toISOString();
  } else if (typeof data === 'number') {
    return data.toString(10);
  } else if (typeof data === 'string') {
    return data;
  } else if (typeof data === 'boolean') {
    return data.toString();
  } else {
    return '';
  }
}
