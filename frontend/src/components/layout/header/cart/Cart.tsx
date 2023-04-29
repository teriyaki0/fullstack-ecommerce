import { useEffect, useState } from "react";

import { useTypedSelector } from "./../../../../hooks/useTypedSelector";
import { useAction } from "./../../../../hooks/useActions";

import styles from "./Cart.module.scss";

import CartItem from "./cart-item/CartItem";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { OnApproveData } from "@paypal/paypal-js";

const Cart = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const cart = useTypedSelector((state) => state.cart.items);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setIsShow(false);
    });
  });

  const { clearFromCart } = useAction();

  const handleOnApprove = (data: OnApproveData, actions: any) => {
    return actions.order.capture().then((details: any) => {
      return clearFromCart();
    });
  };
  
  return (
    <div className={styles.root}>
      <span
        className={styles.item}
        onClick={(e) => {
          e.stopPropagation();
          setIsShow(!isShow);
        }}
      >
        {cart.length}
      </span>
      <span>My Basket</span>
      <svg
        width='25'
        height='25'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
      >
        <path
          fillRule='evenodd'
          d='M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z'
        />
      </svg>
      {isShow && (
        <div className={styles.window} onClick={(e) => e.stopPropagation()}>
          <div>
            {cart.length ? (
              cart.map((item) => <CartItem item={item} key={item.id} />)
            ) : (
              <div>Cart is empty</div>
            )}

            <div className={styles.cart__footer}>
              <div className={styles.cart__content}>
                <div>
                  <span>
                    Total: |
                    {new Intl.NumberFormat("en-Us", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      cart.reduce(
                        (total, item) =>
                          total + item.product.price * item.quantity,
                        0
                      )
                    )}
                  </span>
                </div>
                <div>
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    className={styles.payment__button}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: String(
                                cart.reduce(
                                  (total, item) =>
                                    total + item.product.price * item.quantity,
                                  0
                                )
                              ),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={handleOnApprove}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
