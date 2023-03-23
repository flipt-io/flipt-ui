import { createContext, useState } from 'react';

interface Namespace {
  key: string;
  name: string;
}

interface NamespaceContextType {
  namespace: Namespace | null;
  setNamespace(namespace: Namespace | null): void;
}

export const NamespaceContext = createContext<NamespaceContextType>({
  namespace: null as Namespace | null,
  setNamespace(_namespace: Namespace | null) {}
});

export function NamespaceProvider({ children }: { children: React.ReactNode }) {
  const [namespace, setNamespace] = useState<Namespace | null>(null);

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
