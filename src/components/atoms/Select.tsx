import * as React from 'react';
import cx from 'classnames';

export const Select: React.FunctionComponent<SelectProps> = ({
  options,
  value,
  error,
  onChange: _onChange,
}) => {
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      _onChange(e.target.value);
    },
    [_onChange],
  );

  return (
    <select
      onChange={onChange}
      value={value}
      className={cx(
        'mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0',
        error ? 'border-red-600' : 'border-transparent',
      )}
    >
      {options.map(({ name, value: optionValue }) => (
        <option key={name + value} value={optionValue}>
          {name}
        </option>
      ))}
    </select>
  );
};

export interface SelectProps {
  options: SelectOption[];
  value: string;
  error?: boolean;
  onChange: (value: string) => void;
}

export interface SelectOption {
  name: string;
  value: string;
}
