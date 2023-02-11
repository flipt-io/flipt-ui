import { PlusIcon } from '@heroicons/react/24/outline';
import { useLayoutEffect, useRef, useState } from 'react';
import Button from '~/components/forms/Button';
import { classNames } from '~/utils/helpers';

const tokens = [
  {
    name: 'svc-bedrock',
    description: 'Bedrock service account',
    expiresAt: '2021-08-31T00:00:00Z'
  }
  // More tokens...
];

export default function Tokens() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedTokens.length > 0 && selectedTokens.length < tokens.length;
    setChecked(selectedTokens.length === tokens.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedTokens]);

  function toggleAll() {
    setSelectedTokens(checked || indeterminate ? [] : tokens);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="my-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Static Tokens</h1>
          <p className="mt-2 text-sm text-gray-700">
            Static tokens are used to authenticate with the API
          </p>
        </div>
        <div className="mt-4">
          <Button primary>
            <PlusIcon
              className="-ml-1.5 mr-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
            <span>New Token</span>
          </Button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {selectedTokens.length > 0 && (
                <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Delete All
                  </button>
                </div>
              )}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
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
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
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
                      key={token.expiresAt}
                      className={
                        selectedTokens.includes(token)
                          ? 'bg-gray-50'
                          : undefined
                      }
                    >
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {selectedTokens.includes(token) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-violet-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 sm:left-6"
                          value={token.expiresAt}
                          checked={selectedTokens.includes(token)}
                          onChange={(e) =>
                            setSelectedTokens(
                              e.target.checked
                                ? [...selectedTokens, token]
                                : selectedTokens.filter((p) => p !== token)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedTokens.includes(token)
                            ? 'text-violet-600'
                            : 'text-gray-900'
                        )}
                      >
                        {token.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {token.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {token.expiresAt}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-violet-600 hover:text-violet-900"
                        >
                          Delete<span className="sr-only">, {token.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
