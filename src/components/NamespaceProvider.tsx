import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNamespace } from '~/data/api';
import { INamespace } from '~/types/Namespace';

type PartialNamespace = Pick<INamespace, 'name' | 'key'>;

interface NamespaceContextType {
  currentNamespace: PartialNamespace;
}

export const NamespaceContext = createContext({
  currentNamespace: {} as PartialNamespace
} as NamespaceContextType);

export default function NamespaceProvider({
  children
}: {
  children: React.ReactNode;
}) {
  let { namespaceKey } = useParams();

  const [currentNamespace, setCurrentNamespace] = useState<PartialNamespace>({
    name: '',
    key: ''
  });

  useEffect(() => {
    if (namespaceKey === '') {
      getNamespace('default').then((namespace: INamespace) => {
        setCurrentNamespace(namespace);
      });
      return;
    }

    if (namespaceKey !== undefined && namespaceKey !== currentNamespace.key) {
      getNamespace(namespaceKey).then((namespace: INamespace) => {
        setCurrentNamespace(namespace);
      });
    }
  }, [currentNamespace.key, namespaceKey]);

  return (
    <NamespaceContext.Provider
      value={{
        currentNamespace
      }}
    >
      {children}
    </NamespaceContext.Provider>
  );
}
