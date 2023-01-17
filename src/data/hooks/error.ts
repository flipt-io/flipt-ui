import { useContext } from 'react';
import { ErrorContext } from '~/components/ErrorProvider';

export const useError = () => {
  const { error, setError, clearError } = useContext(ErrorContext);
  return { error, setError, clearError };
};
