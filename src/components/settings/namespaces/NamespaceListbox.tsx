import { useLocation, useNavigate } from 'react-router-dom';
import Listbox, { ISelectable } from '~/components/forms/Listbox';
import useNamespace from '~/data/hooks/namespace';
import { INamespace } from '~/types/Namespace';

type SelectableNamespace = Pick<INamespace, 'key' | 'name'> & ISelectable;

type NamespaceLisboxProps = {
  disabled: boolean;
  namespaces: INamespace[];
  className?: string;
};

export default function NamespaceListbox(props: NamespaceLisboxProps) {
  const { disabled, namespaces, className } = props;

  const { currentNamespace } = useNamespace();
  const location = useLocation();
  const navigate = useNavigate();

  const setCurrentNamespace = (namespace: SelectableNamespace) => {
    // navigate to the current location.path with the new namespace prependend
    // e.g. /namespaces/default/segments -> /namespaces/namespaceKey/segments

    const path = location.pathname.split('/');

    // if path does not begin with /namespaces/:namespaceKey, prepend it
    if (path[1] !== 'namespaces') {
      path.unshift('namespaces');
    }

    path[2] = namespace.key;

    const newPath = path.join('/');
    navigate(newPath);
  };

  return (
    <Listbox<SelectableNamespace>
      disabled={disabled}
      id="namespaceKey"
      name="namespaceKey"
      className={className}
      values={namespaces.map((n) => ({
        ...n,
        displayValue: n.name
      }))}
      selected={{
        ...currentNamespace,
        displayValue: currentNamespace?.name || ''
      }}
      setSelected={setCurrentNamespace}
    />
  );
}
