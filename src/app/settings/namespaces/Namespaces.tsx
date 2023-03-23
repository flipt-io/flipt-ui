import { PlusIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import EmptyState from '~/components/EmptyState';
import Button from '~/components/forms/Button';
import NamespaceTable from '~/components/settings/namespaces/NamespaceTable';
import { listNamespaces } from '~/data/api';
import { INamespace } from '~/types/Namespace';

export default function Namespaces(): JSX.Element {
  const [namespaces, setNamespaces] = useState<INamespace[]>([]);

  const [showNamespaceForm, setShowNamespaceForm] = useState<boolean>(false);

  const [showDeleteNamespaceModal, setShowDeleteNamespaceModal] =
    useState<boolean>(false);
  const [deletingNamespace, setDeletingNamespace] = useState<INamespace | null>(
    null
  );

  const [namespacesVersion, setNamespacesVersion] = useState(0);

  const fetchNamespaces = useCallback(() => {
    listNamespaces().then((resp) => {
      console.log(resp);
      setNamespaces(resp.namespaces);
    });
  }, []);

  const incrementNamespacesVersion = () => {
    setNamespacesVersion(namespacesVersion + 1);
  };

  useEffect(() => {
    fetchNamespaces();
  }, [fetchNamespaces, namespacesVersion]);

  return (
    <div className="my-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-700">Namespaces</h1>
          <p className="mt-2 text-sm text-gray-500">
            Namespaces allow you to group your flags, segments and rules under a
            single name.
          </p>
        </div>
        <div className="mt-4">
          <Button primary onClick={() => setShowNamespaceForm(true)}>
            <PlusIcon
              className="-ml-1.5 mr-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
            <span>New Namespace</span>
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        {namespaces && namespaces.length > 0 ? (
          <NamespaceTable
            namespaces={namespaces}
            setDeletingNamespace={setDeletingNamespace}
            setShowDeleteNamespaceModal={setShowDeleteNamespaceModal}
          />
        ) : (
          <EmptyState
            text="New Namespace"
            onClick={() => {
              setShowNamespaceForm(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
