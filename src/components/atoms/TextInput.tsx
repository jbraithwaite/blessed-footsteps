import { AutoComplete, HTMLProps } from '@utils/html';
import cx from 'classnames';
import * as React from 'react';

export const TextInput: React.FunctionComponent<TextInputProps> = ({
  value,
  kind = 'text',
  error,
  onChange,
  ...rest
}) => {
  const didChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <input
      {...rest}
      type={kind}
      value={value}
      onChange={didChange}
      className={cx(
        'mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0',
        error ? 'border-red-600' : 'border-transparent',
      )}
    />
  );
};

export interface TextInputProps
  extends HTMLProps<
    'input',
    'disabled' | 'id' | 'placeholder' | 'required' | 'min' | 'max' | 'step'
  > {
  value: string;
  kind?: 'text' | 'email' | 'number';
  autoComplete?: AutoComplete;
  onChange?: (value: string) => void;
  error?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}
