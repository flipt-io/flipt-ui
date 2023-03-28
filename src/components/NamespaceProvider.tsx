import { createContext, useEffect, useState } from 'react';
import { getNamespace } from '~/data/api';
import { INamespace } from '~/types/Namespace';

type PartialNamespace = Pick<INamespace, 'name' | 'key'>;

interface NamespaceContextType {
  currentNamespace: PartialNamespace;
  setCurrentNamespace: (namespace: PartialNamespace) => void;
}

export const NamespaceContext = createContext({
  currentNamespace: {} as PartialNamespace,
  setCurrentNamespace: (_namespace: PartialNamespace) => {}
} as NamespaceContextType);

export default function NamespaceProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [currentNamespace, setCurrentNamespace] = useState<PartialNamespace>({
    name: '',
    key: ''
  });

  useEffect(() => {
    if (currentNamespace.key === '') {
      getNamespace('default').then((namespace) => {
        setCurrentNamespace(namespace);
      });
    }
  }, [currentNamespace.key]);

  return (
    <NamespaceContext.Provider
      value={{
        currentNamespace,
        setCurrentNamespace
      }}
    >
      {children}
    </NamespaceContext.Provider>
  );
}
