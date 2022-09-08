import * as React from 'react';
import { SuccessMessage } from './SuccessMessage';
import { useStore } from './store';
import { Checkbox } from '@atoms/Checkbox';
import { TextInput } from '@atoms/TextInput';
import { useAnalytics } from '@hooks/providers/analytics';
import { FormGroup } from '@molecules/FormGroup';
import useMutation from 'swr/mutation';

const url =
  'https://blessedfootsteps.us5.list-manage.com/subscribe/post?u=ca1d84b71f4857272cf3d01b6&amp;id=889213de3b';

export const NewsletterSignup = () => {
  const { track } = useAnalytics();
  const {
    validate,
    errors,
    fields: { email, firstName, lastName, updatesBook, updatesDaily },
  } = useStore();

  const {
    data: subscribed,
    error,
    trigger,
    isMutating,
  } = useMutation(
    () => ({
      url,
      args: { validate },
    }),
    (options) => {
      const valitation = options.args.validate();

      if (!valitation.success) {
        return false;
      }

      const formData = new FormData();

      formData.set('EMAIL', valitation.data.email);
      formData.set('FNAME', valitation.data.firstName);
      formData.set('LNAME', valitation.data.lastName);

      if (valitation.data.updatesDaily) {
        formData.set('group[30250][2]', '2');
      }

      if (valitation.data.updatesBook) {
        formData.set('group[30250][1]', '1');
      }

      return fetch(options.url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      }).then(() => {
        track('Newsletter Signup', {
          updates:
            valitation.data.updatesDaily && valitation.data.updatesBook
              ? 'Daily & Book'
              : valitation.data.updatesDaily
              ? 'Daily'
              : valitation.data.updatesBook
              ? 'Book'
              : undefined,
        });

        return true;
      });
    },
  );

  return subscribed ? (
    <SuccessMessage />
  ) : (
    <form className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-2 gap-6">
        <FormGroup label="First Name" {...firstName.formGroupProps}>
          <TextInput autoComplete="given-name" {...firstName.inputProps} />
        </FormGroup>
        <FormGroup label="Last Name" {...lastName.formGroupProps}>
          <TextInput autoComplete="family-name" {...lastName.inputProps} />
        </FormGroup>
      </div>

      <FormGroup label="Email" {...email.formGroupProps}>
        <TextInput kind="email" autoComplete="email" {...email.inputProps} />
      </FormGroup>

      <div>
        <strong className="text-gray-700">
          Which kinds of updates would you like to receive?
        </strong>
        <div className="mt-2">
          <div>
            <Checkbox
              {...updatesDaily.inputProps}
              label="Daily updates of `Abdu'l-Bahá's travels in California
                  (Oct. 3rd – Oct. 26th)"
            />
          </div>
          <div>
            <label className="inline-flex items-center">
              <Checkbox
                {...updatesBook.inputProps}
                label="Book launch updates"
              />
            </label>
          </div>
        </div>
      </div>
      {errors.length > 0 && (
        <div className="text-red-600 bg-red-50 py-2 px-3">
          <>{errors.join(', ')}</>
        </div>
      )}
      {error && (
        <div className="text-red-600 bg-red-50 py-2 px-3">
          Could not subscribe at this time. Please try again later.
        </div>
      )}
      <button
        className={`px-10 py-4 text-lg text-center space-x-2 rounded-md ${
          isMutating
            ? 'bg-gray-300 text-gray-50'
            : 'bg-gray-800 text-gray-300 shadow-lg hover:bg-gray-700'
        }  leading-5 font-medium transition ease-in-out duration-100`}
        disabled={isMutating}
        onClick={trigger}
      >
        {isMutating ? 'Loading' : 'Sign up'}
      </button>
    </form>
  );
};

export interface NewsletterSignupProps {}
