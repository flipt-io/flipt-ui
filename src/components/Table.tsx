/* eslint-disable @typescript-eslint/no-unused-vars */
import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}
