import { isRight } from 'fp-ts/lib/Either';
import * as React from 'react';
import { SuccessMessage } from './SuccessMessage';
import { useStore } from './store';
import { Checkbox } from 'components/form/Checkbox';
import { FormGroup } from 'components/form/FormGroup';
import { TextInput } from 'components/form/TextInput';
import { useAnalytics } from 'src/hooks/analytics';
import { loadable } from 'types/failable';
import { useLoadableState } from 'types/failable/loadable';

export const NewsletterSignup = () => {
  const [submission, mutations] = useLoadableState<unknown>();
  const { track } = useAnalytics();

  const {
    validate,
    errors,
    fields: { email, firstName, lastName, updatesBook, updatesDaily },
  } = useStore();

  return submission.state === 'success' ? (
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
      {submission.state === 'failure' && (
        <div className="text-red-600 bg-red-50 py-2 px-3">
          Could not subscribe at this time. Please try again later.
        </div>
      )}
      <button
        className={`px-10 py-4 text-lg text-center space-x-2 rounded-md ${
          submission.loading
            ? 'bg-gray-300 text-gray-50'
            : 'bg-gray-800 text-gray-300 shadow-lg hover:bg-gray-700'
        }  leading-5 font-medium transition ease-in-out duration-100`}
        disabled={submission.loading}
        onClick={() => {
          const validation = validate();

          if (isRight(validation)) {
            const data = validation.right;
            const formData = new FormData();

            formData.set('EMAIL', data.email);
            formData.set('FNAME', data.firstName);
            formData.set('LNAME', data.lastName);

            if (data.updatesDaily) {
              formData.set('group[30250][2]', '2');
            }

            if (data.updatesBook) {
              formData.set('group[30250][1]', '1');
            }

            loadable.accept(
              mutations,
              fetch(
                'https://blessedfootsteps.us5.list-manage.com/subscribe/post?u=ca1d84b71f4857272cf3d01b6&amp;id=889213de3b',
                { method: 'POST', body: formData, mode: 'no-cors' },
              ).then(() => {
                track('Newsletter Signup', {
                  updates:
                    data.updatesDaily && data.updatesBook
                      ? 'Daily & Book'
                      : data.updatesDaily
                      ? 'Daily'
                      : data.updatesBook
                      ? 'Book'
                      : undefined,
                });
              }),
            );
          }
        }}
      >
        {submission.loading ? 'Loading' : 'Sign up'}
      </button>
    </form>
  );
};

export interface NewsletterSignupProps {}
