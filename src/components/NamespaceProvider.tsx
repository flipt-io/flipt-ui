import { createContext, useState } from 'react';
import { INamespace } from '~/types/Namespace';

interface NamespaceContextType {
  namespace: INamespace | null;
  setNamespace(namespace: INamespace | null): void;
}

export const NamespaceContext = createContext<NamespaceContextType>({
  namespace: null as INamespace | null,
  setNamespace(_namespace: INamespace | null) {}
});

export function NamespaceProvider({ children }: { children: React.ReactNode }) {
  const [namespace, setNamespace] = useState<INamespace | null>(null);

  return (
    <NamespaceContext.Provider
      value={{
        namespace,
        setNamespace
      }}
    >
      {children}
    </NamespaceContext.Provider>
  );
}
