import React, { FC, useState } from "react";
import styles from "./CartAction.module.scss";
import { ICartItem } from "types/cart.interface";

import { useAction } from "./../../../../../../hooks/useActions";
const CartAction: FC<{ item: ICartItem }> = ({ item }) => {
  const { removeFromCart, incrementToCart, decrementToCart } = useAction();

  return (
    <div className={styles.actions}>
      <div>
        <button
          className={styles.action}
          onClick={() => decrementToCart(item.id)}
        >
          -
        </button>
        <input
          className={styles.input}
          type='text'
          value={item.quantity}
          readOnly
        />
        <button
          className={styles.action}
          onClick={() => incrementToCart(item.id)}
        >
          +
        </button>
      </div>

      <button className={styles.remove} onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
};

export default CartAction;
