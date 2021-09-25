import * as React from 'react';
import { AutoComplete, HTMLProps } from 'src/utils';

export const TextArea: React.FunctionComponent<TextAreaProps> = () => {
  return <>NOT IMPLEMENTED YET</>;
};

export interface TextAreaProps
  extends HTMLProps<
    'textarea',
    'disabled' | 'id' | 'placeholder' | 'required'
  > {
  value: string;
  autoComplete?: AutoComplete;
  onChange?: (value: string) => void;
  error?: boolean;
  maxLength?: number;
}
