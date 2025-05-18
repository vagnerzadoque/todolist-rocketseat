import { Trash } from 'phosphor-react';
import React from 'react';
import styles from './ItemList.module.css'
interface ItemListProps {
  description: string
  id: number
  removeItem: (id: number) => void
  doneItem: (id: number) => void
}

export const ItemList: React.FC<ItemListProps> = ({description, removeItem, id, doneItem}) => {
  return (
    <div key={id} className={styles.contentItem}>
        <input type="checkbox" name="" id="" onClick={() => doneItem(id)} />
      <p>{description}</p>
      <button onClick={() => removeItem(id)}>
      <Trash size={18} />
      </button>
    </div>
  );
};

export default ItemList;