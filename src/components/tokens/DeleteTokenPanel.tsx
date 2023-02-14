import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { deleteToken } from '~/data/api';
import { useError } from '~/data/hooks/error';
import { IAuthenticationToken } from '~/types/Auth';
import Button from '../forms/Button';

type DeleteTokenPanelProps = {
  setOpen: (open: boolean) => void;
  token: IAuthenticationToken | null;
  onSuccess: () => void;
};

export default function DeleteTokenPanel(props: DeleteTokenPanelProps) {
  const { setOpen, token, onSuccess } = props;
  const { setError, clearError } = useError();

  const handleSubmit = () => {
    if (token) {
      return deleteToken(token.id);
    }
  };

  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Delete Token
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete the token{' '}
              <span className="font-medium text-violet-500">
                {token?.metadata['io.flipt.auth.token.name']}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-row-reverse space-x-2 space-x-reverse sm:mt-4">
        <Button
          primary
          type="button"
          onClick={() => {
            handleSubmit()
              ?.then(() => {
                clearError();
                onSuccess();
              })
              .catch((err) => {
                setError(err);
              });
          }}
        >
          Delete
        </Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </>
  );
}
