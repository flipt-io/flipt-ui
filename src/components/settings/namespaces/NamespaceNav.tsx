import { useState } from 'react';
import Listbox, { ISelectable } from '~/components/forms/Listbox';
import { INamespaceBase } from '~/types/Namespace';

type SelectableNamespace = INamespaceBase & ISelectable;

type NamespaceNavProps = {
  namespaces: INamespaceBase[];
  className?: string;
};

export default function NamespaceNav(props: NamespaceNavProps) {
  const { namespaces, className } = props;

  const [selectedNamespace, setSelectedNamespace] =
    useState<SelectableNamespace | null>(null);

  return (
    <Listbox<SelectableNamespace>
      id="namespaceKey"
      name="namespaceKey"
      className={className}
      values={namespaces.map((n) => ({
        ...n,
        displayValue: n.name
      }))}
      selected={selectedNamespace}
      setSelected={setSelectedNamespace}
    />
  );
}
