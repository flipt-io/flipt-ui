import { createContext, useState } from 'react';

export const ErrorContext = createContext({
  error: null as Error | null,
  setError(error: Error | null) {},
  clearError() {}
});

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);

  const contextValue = {
    error,
    setError,
    clearError: () => setError(null)
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}
