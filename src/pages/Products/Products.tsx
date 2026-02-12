import { useCallback, useEffect, useState } from 'react';
import styles from './Products.module.css';
import type { Product, SortField, SortOrder } from '../../types/products';
import { ProductsTable } from './ProductsTable';
import { AddProductModal } from './AddProductModal';
import { getProducts } from '../../api/products';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('price');
  const [order, setOrder] = useState<SortOrder>('asc');
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts({ search, sortBy, order });
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  }, [search, sortBy, order]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Товары</h1>
        <IconField className={styles.inputContainer} iconPosition="left">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText
            className={styles.input}
            placeholder="Найти"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
          />
        </IconField>
      </header>

      <div className={styles.tableContainer}>
        <div className={styles.toolbar}>
          <h2>Все позиции</h2>
          <Button
            icon="pi pi-plus"
            onClick={() => setShowModal(true)}
            label="Добавить"
          />
        </div>

        {loading && <div className={styles.progress} />}

        <ProductsTable
          products={products}
          sortBy={sortBy}
          order={order}
          onSort={(field) => {
            setOrder(order === 'asc' ? 'desc' : 'asc');
            setSortBy(field);
          }}
        />
      </div>

      <AddProductModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAdd={(product) => {
          setProducts((prev) => [product, ...prev]);
          alert('Товар добавлен ✅');
        }}
      />
    </div>
  );
};
