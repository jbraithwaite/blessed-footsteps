import { HTMLProps } from '@utils/html';
import cx from 'classnames';
import * as React from 'react';

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
  value,
  error,
  onChange,
  ...rest
}) => {
  const didChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange && onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <textarea
      {...rest}
      value={value}
      onChange={didChange}
      className={cx(
        'mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0',
        error ? 'border-red-600' : 'border-transparent',
      )}
    ></textarea>
  );
};

export interface TextAreaProps
  extends HTMLProps<
    'textarea',
    'disabled' | 'id' | 'placeholder' | 'required'
  > {
  value: string;
  onChange?: (value: string) => void;
  error?: boolean;
  maxLength?: number;
}
