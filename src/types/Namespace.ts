import { IPageable } from './Pageable';

export interface INamespaceBase {
  key: string;
  name: string;
  description: string;
}

export interface INamespace extends INamespaceBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface INamespaceList extends IPageable {
  namespaces: INamespace[];
}
