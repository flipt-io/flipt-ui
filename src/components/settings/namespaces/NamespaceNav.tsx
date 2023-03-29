import Listbox, { ISelectable } from '~/components/forms/Listbox';
import useNamespace from '~/data/hooks/namespace';
import { INamespace } from '~/types/Namespace';

type SelectableNamespace = Pick<INamespace, 'key' | 'name'> & ISelectable;

type NamespaceNavProps = {
  disabled: boolean;
  namespaces: INamespace[];
  className?: string;
};

export default function NamespaceNav(props: NamespaceNavProps) {
  const { disabled, namespaces, className } = props;

  const { currentNamespace, setCurrentNamespace } = useNamespace();

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
