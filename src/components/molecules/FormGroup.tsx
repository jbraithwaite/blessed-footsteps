import * as React from 'react';

export const FormGroup: React.FunctionComponent<
  React.PropsWithChildren<FormGroupProps>
> = ({ label, errors, required, children, ...rest }) => {
  return (
    <label {...rest}>
      <span className="text-gray-700">
        {label}
        {required && <span className="text-red-600">*</span>}
      </span>
      {children}
      {errors && (
        <div className="text-red-600 mt-1">
          <>{errors.join(', ')}</>
        </div>
      )}
    </label>
  );
};

export interface FormGroupProps {
  label?: string;
  errors?: string[];
  required?: boolean;
}
