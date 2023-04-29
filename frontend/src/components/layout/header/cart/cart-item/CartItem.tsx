import { FC } from "react";
import { ICartItem } from "types/cart.interface";
import styles from "@components/layout/header/cart/Cart.module.scss";
import CartAction from "./cart-action/CartAction";

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
  const priceProduct = item.product.price * item.quantity;
  return (
    <div className={styles.cart__item}>
      <div className={styles.item__flex}>
        <img
          width={170}
          src={`http://localhost:5173/${item.product.image[0]}`}
          alt='product'
        />
        <div className={styles.content}>
          <div className={styles.name}>{item.product.name}</div>
          <div className={styles.price}>
            {new Intl.NumberFormat("en-Us", {
              style: "currency",
              currency: "USD",
            }).format(priceProduct)}
            <CartAction item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
