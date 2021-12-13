import { isLeft } from 'fp-ts/lib/Either';
import {
  failure,
  Type,
  success,
  Validation,
  Validate,
  getDefaultContext,
} from 'io-ts';
import * as React from 'react';
import { defined, optionalPluck } from 'src/utils';

export const number: Validator<number> = new Type(
  'Input(Number)',
  (inputValue): inputValue is number => {
    return typeof inputValue === 'number';
  },
  (i, c) => {
    const value: number = Number.parseInt(i, 10);
    return Number.isNaN(value) ? failure(i, c) : success(value);
  },
  (inputValue) => inputValue.toString(10),
);

export const string: Validator<string> = new Type(
  'Input(String)',
  (inputValue): inputValue is string => {
    return typeof inputValue === 'string';
  },
  (i, c) => (i === '' ? failure(i, c, 'Field is required') : success(i)),
  (inputValue) => inputValue.trim(),
);

export const boolean: Validator<boolean> = new Type(
  'Input(Boolean)',
  (inputValue): inputValue is boolean => {
    return typeof inputValue === 'boolean';
  },
  (i, c) =>
    i === 'true' || i === 'false'
      ? success(i === 'true')
      : failure(i, c, 'Field is required'),
  (inputValue) => inputValue.toString(),
);

export const email: Validator<string> = new Type(
  'Input(Email)',
  (inputValue): inputValue is string => {
    return typeof inputValue === 'string';
  },
  (i, c) =>
    i === ''
      ? failure(i, c, 'Field is required')
      : !validateEmail(i)
      ? failure(i, c, 'Not a valid email address')
      : success(i),
  (inputValue) => inputValue.trim(),
);

export function optional<Value>(
  validator: Validator<Value>,
): Validator<Value | undefined> {
  return {
    name: `optional(${validator.name})`,
    encode: (value) => (value === undefined ? '' : validator.encode(value)),
    decode: (data) =>
      data === '' ? success(undefined) : validator.decode(data),
    validate: (data, ctx) =>
      data === '' ? success(undefined) : validator.validate(data, ctx),
  };
}

export function maxLengthValidator<Value>(
  length: number,
  validator: Validator<Value>,
): Validator<Value> {
  return {
    name: `maxLength(${validator.name})`,
    encode: validator.encode,
    decode: validator.decode,
    validate: (data, ctx) =>
      data.length <= length
        ? validator.validate(data, ctx)
        : failure(data, ctx, `${length} character limit`),
  };
}

export interface Validator<Value, InputType = string> {
  name: string;
  /** This takes the Value and encodes it for the input. */
  encode(value: Value): InputType;
  /** Decode the value from the input and checks if it is valid. */
  decode(data: InputType): Validation<Value> | Promise<Validation<Value>>;
  validate: Validate<InputType, Value>;
}

export interface Input<T extends any> {
  validate: (options?: {silent: boolean}) => Validation<T>;
  reset: () => void;
  formGroupProps: {
    required: boolean;
    errors: string[];
  };
  inputProps: {
    value: string;
    required: boolean;
    error: boolean;
    onChange: (value: string) => void;
    maxLength?: number;
  };
}

export function useInput<T>(
  validator: Validator<T>,
  options?: { maxLength?: number; initial?: T; label?: string },
): Input<T> {
  const context = getDefaultContext({} as any);

  const defaultValue =
    options?.initial === undefined ? '' : validator.encode(options.initial);

  const [errors, setErrors] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string>(defaultValue);

  const maxLength = options?.maxLength;
  const required = isLeft(validator.validate('', getDefaultContext({} as any)));

  const clearErrors = React.useCallback(() => {
    setErrors([]);
  }, []);

  const onChange = React.useCallback(
    (v: string) => {
      setValue(v);
      clearErrors();
    },
    [clearErrors],
  );

  const reset = React.useCallback(() => {
    setValue(defaultValue);
    clearErrors();
  }, [defaultValue, clearErrors]);

  const validate = React.useCallback((options?: {silent: boolean}) => {
    if (options?.silent) {
      return validator.validate(value, context);
    }

    clearErrors();
    const validation = validator.validate(value, context);

    if (isLeft(validation)) {
      setErrors(validation.left.map(optionalPluck('message')).filter(defined));
    }

    return validation;
  }, [validator, value, context, clearErrors]);

  return {
    validate,
    reset,
    formGroupProps: {
      errors,
      required,
    },
    inputProps: {
      value,
      required,
      error: errors.length > 0,
      maxLength,
      onChange,
    },
  };
}

export type InputsOf<T> = {
  [P in keyof T]-?: Input<T[P]>;
};

function validateEmail(emailAddress: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return re.test(emailAddress);
}
