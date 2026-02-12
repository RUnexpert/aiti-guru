import type { Product, SortField } from '../../types/products.ts';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import styles from './Products.module.css';

interface Props {
  products: Product[];
  sortBy?: SortField;
  order?: 'asc' | 'desc';
  onSort?: (field: SortField) => void;
}

export const ProductsTable = ({ products, sortBy, order, onSort }: Props) => {
  const titleBodyTemplate = (rowData: Product) => (
    <>
      <strong>{rowData.title}</strong>
      <div className={styles.category}>{rowData.category}</div>
    </>
  );

  const ratingBodyTemplate = (rowData: Product) => (
    <span className={rowData.rating < 3 ? styles.ratingBad : styles.ratingGood}>
      {rowData.rating}/5
    </span>
  );

  const priceBodyTemplate = (rowData: Product) =>
    `${rowData.price.toLocaleString()} ₽`;

  return (
    <DataTable
      value={products}
      sortField={sortBy}
      sortOrder={order === 'asc' ? 1 : -1}
      onSort={(e) => onSort?.(e.sortField as SortField)}
      responsiveLayout="scroll"
      className={styles.tableWrapper}
      paginator
      rows={5}
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      <Column
        field="title"
        header="Наименование"
        body={titleBodyTemplate}
        sortable
      />
      <Column field="brand" header="Вендор" />
      <Column field="sku" header="Артикул" />
      <Column
        field="rating"
        header="Оценка"
        body={ratingBodyTemplate}
        sortable
      />
      <Column
        field="price"
        header="Цена, ₽"
        body={priceBodyTemplate}
        sortable
      />
    </DataTable>
  );
};
