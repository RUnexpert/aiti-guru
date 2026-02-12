import { useState } from 'react';
import type { Product } from '../../types/products';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import styles from './AddProductModal.module.css';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export const AddProductModal = ({ visible, onClose, onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');

  const submit = () => {
    onAdd({
      id: Date.now(),
      title,
      price,
      brand,
      sku,
      rating: 5,
      category: 'Новый товар',
    });
    onClose();
  };

  const footer = (
    <div className={styles.actions}>
      <Button label="Отмена" severity="secondary" onClick={onClose} />
      <Button label="Добавить" icon="pi pi-check" onClick={submit} />
    </div>
  );

  return (
    <Dialog
      header="Добавить товар"
      visible={visible}
      onHide={onClose}
      footer={footer}
      modal
      className={styles.modal}
      draggable={false}
    >
      <div className={styles.modalForm}>
        <InputText
          placeholder="Наименование"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <InputText
          placeholder="Цена"
          type="number"
          value={price.toString()}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPrice(Number.isNaN(value) ? 0 : value);
          }}
        />

        <InputText
          placeholder="Вендор"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <InputText
          placeholder="Артикул"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
      </div>
    </Dialog>
  );
};
