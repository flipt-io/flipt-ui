import { PlusIcon } from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import EmptyState from '~/components/EmptyState';
import Button from '~/components/forms/Button';
import Modal from '~/components/Modal';
import Slideover from '~/components/Slideover';
import DeleteTokenPanel from '~/components/tokens/DeleteTokenPanel';
import ShowTokenPanel from '~/components/tokens/ShowTokenPanel';
import { listTokens } from '~/data/api';
import { useError } from '~/data/hooks/error';
import {
  IAuthToken,
  IAuthTokenList,
  IAuthTokenSecret
} from '~/types/auth/Token';
import TokenForm from './TokenForm';

export async function tokenLoader(): Promise<IAuthTokenList> {
  return listTokens();
}

export default function Tokens() {
  // const checkbox = useRef();
  const data = useLoaderData() as IAuthTokenList;
  const [tokens, setTokens] = useState<IAuthToken[]>(data.authentications);

  const [tokensVersion, setTokensVersion] = useState(0);

  const { setError, clearError } = useError();

  const fetchTokens = useCallback(() => {
    listTokens()
      .then((data) => {
        setTokens(data.authentications);
        clearError();
      })
      .catch((err) => {
        setError(err);
      });
  }, [clearError, setError]);

  const incrementTokensVersion = () => {
    setTokensVersion(tokensVersion + 1);
  };

  useEffect(() => {
    fetchTokens();
  }, [tokensVersion, fetchTokens]);

  // const [checked, setChecked] = useState(false);
  // const [indeterminate, setIndeterminate] = useState(false);
  // const [selectedTokens, setSelectedTokens] = useState<IAuthenticationToken[]>(
  //   []
  // );

  const [createdToken, setCreatedToken] = useState<IAuthTokenSecret | null>(
    null
  );
  const [showCreatedTokenModal, setShowCreatedTokenModal] = useState(false);

  const [showTokenForm, setShowTokenForm] = useState<boolean>(false);

  const [showDeleteTokenModal, setShowDeleteTokenModal] =
    useState<boolean>(false);
  const [deletingToken, setDeletingToken] = useState<IAuthToken | null>(null);

  // useLayoutEffect(() => {
  //   const isIndeterminate =
  //     selectedTokens.length > 0 && selectedTokens.length < tokens.length;
  //   setChecked(selectedTokens.length === tokens.length);
  //   setIndeterminate(isIndeterminate);
  //   if (checkbox && checkbox.current) {
  //     checkbox.current.indeterminate = isIndeterminate;
  //   }
  // }, [selectedTokens]);

  // const toggleAll = () => {
  //   setSelectedTokens(checked || indeterminate ? [] : tokens);
  //   setChecked(!checked && !indeterminate);
  //   setIndeterminate(false);
  // };

  const tokenFormRef = useRef(null);

  return (
    <>
      {/* token create form */}
      <Slideover
        open={showTokenForm}
        setOpen={setShowTokenForm}
        ref={tokenFormRef}
      >
        <TokenForm
          ref={tokenFormRef}
          setOpen={setShowTokenForm}
          onSuccess={(token: IAuthTokenSecret) => {
            incrementTokensVersion();
            setShowTokenForm(false);
            setCreatedToken(token);
            setShowCreatedTokenModal(true);
          }}
        />
      </Slideover>

      {/* token delete modal */}
      <Modal open={showDeleteTokenModal} setOpen={setShowDeleteTokenModal}>
        <DeleteTokenPanel
          token={deletingToken}
          setOpen={setShowDeleteTokenModal}
          onSuccess={() => {
            incrementTokensVersion();
            setShowDeleteTokenModal(false);
          }}
        />
      </Modal>

      {/* token created modal */}
      <Modal open={showCreatedTokenModal} setOpen={setShowCreatedTokenModal}>
        <ShowTokenPanel
          token={createdToken}
          setOpen={setShowCreatedTokenModal}
        />
      </Modal>

      <div className="my-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-700">
              Static Tokens
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Static tokens are used to authenticate with the API
            </p>
          </div>
          <div className="mt-4">
            <Button primary onClick={() => setShowTokenForm(true)}>
              <PlusIcon
                className="-ml-1.5 mr-1 h-5 w-5 text-white"
                aria-hidden="true"
              />
              <span>New Token</span>
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          {tokens && tokens.length > 0 ? (
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
                  {/* {selectedTokens.length > 0 && (
                    <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                      <button
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Delete All
                      </button>
                    </div>
                  )} */}
                  <table className="min-w-full table-fixed divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {/* <th
                          scope="col"
                          className="relative w-12 px-6 sm:w-16 sm:px-8"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 sm:left-6"
                            ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th> */}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Created
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Expires
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {tokens.map((token) => (
                        <tr
                          key={token.id}
                          // className={
                          //   selectedTokens.includes(token)
                          //     ? 'bg-gray-50'
                          //     : undefined
                          // }
                        >
                          {/* <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                            {selectedTokens.includes(token) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-violet-600" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 sm:left-6"
                              value={token.id}
                              checked={selectedTokens.includes(token)}
                              onChange={(e) =>
                                setSelectedTokens(
                                  e.target.checked
                                    ? [...selectedTokens, token]
                                    : selectedTokens.filter((p) => p !== token)
                                )
                              }
                            />
                          </td> */}
                          <td
                            className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-700"
                            // className={classNames(
                            //   'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                            //   selectedTokens.includes(token)
                            //     ? 'text-violet-600'
                            //     : 'text-gray-900'
                            // )}
                          >
                            {token.metadata['io.flipt.auth.token.name']}
                          </td>
                          <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {token.metadata['io.flipt.auth.token.description']}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {format(parseISO(token.createdAt), 'MM/dd/yyyy')}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {token.expiresAt !== null &&
                              format(parseISO(token.expiresAt), 'MM/dd/yyyy')}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-violet-600 hover:text-violet-900"
                              onClick={(e) => {
                                e.preventDefault();
                                setDeletingToken(token);
                                setShowDeleteTokenModal(true);
                              }}
                            >
                              Delete
                              <span className="sr-only">
                                , {token.metadata['io.flipt.auth.token.name']}
                              </span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              text="New Token"
              onClick={() => {
                setShowTokenForm(true);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
