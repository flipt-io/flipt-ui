import { useContext } from 'react';
import { ErrorContext } from '~/components/ErrorProvider';

export default function useError() {
  const { error, setError, clearError } = useContext(ErrorContext);
  return { error, setError, clearError };
}
