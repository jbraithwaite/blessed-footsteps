import * as React from 'react';

export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  label,
  value,
  onChange: originalOnChange,
}) => {
  const onClick = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      originalOnChange(e.target.checked.toString());
    },
    [originalOnChange],
  );

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
        checked={value === 'true'}
        onChange={onClick}
      />
      <span className="ml-2 text-gray-600">{label}</span>
    </label>
  );
};

export interface CheckboxProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}
