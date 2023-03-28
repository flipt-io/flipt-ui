import { useContext } from 'react';
import { NamespaceContext } from '~/components/NamespaceProvider';

export default function useNamespace() {
  const { currentNamespace, setCurrentNamespace } =
    useContext(NamespaceContext);
  return { currentNamespace, setCurrentNamespace };
}
