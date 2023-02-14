import { Dialog } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import hljs from 'highlight.js';
import text from 'highlight.js/lib/languages/plaintext';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEffect } from 'react';
import { IToken } from '~/types/Auth';
import Button from '../forms/Button';

hljs.registerLanguage('text', text);

type ShowTokenPanelProps = {
  setOpen: (open: boolean) => void;
  token: IToken | null;
};

export default function ShowTokenPanel(props: ShowTokenPanelProps) {
  const { setOpen, token } = props;

  useEffect(() => {
    hljs.initHighlighting();
  }, [token]);

  return (
    <>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Created Token
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Please copy the token below and store it in a secure location.
            </p>
            <p className="text-sm text-gray-700">
              You will not be able to view it again!
            </p>
          </div>
          <div className="mt-4">
            <pre className="p-2 text-sm md:h-full">
              <code className="text rounded-sm md:h-full">
                {token?.clientToken}
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <Button
          className="inline-flex justify-center sm:w-full"
          primary
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </div>
    </>
  );
}
