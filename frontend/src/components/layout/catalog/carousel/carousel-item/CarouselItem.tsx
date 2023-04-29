import { FC, useState } from "react";
import { IProduct } from "types/product.interface";
import cn from "clsx";
import styles from "../Carousel.module.scss";
import { useAction } from "../../../../../hooks/useActions";
import { Link } from "react-router-dom";

interface ICarouselItem {
  active: boolean;
  selectActive: () => void;
  product: IProduct;
}

const CarouselItem: FC<ICarouselItem> = ({ product, active, selectActive }) => {
  const { addToCart } = useAction();
  return (
    <div
      className={cn(styles.item, {
        [styles.active]: active,
      })}
      onClick={selectActive}
    >
      <img
        className={styles.image}
        src={product.image[0]}
        alt={product.name}
        width={240}
      />
      <div className={styles.content}>
        <div>
          <div className={styles.name}>{product.name}</div>

          <p className={styles.description}>
            {product.description}
            <br />
          </p>
          {active ? (
            <span className={styles.more}>
              <Link to={`/product/${product.id}`}>Read more...</Link>
            </span>
          ) : (
            ""
          )}
        </div>

        {active ? (
          <button
            className={styles.button}
            onClick={() => addToCart({ product, quantity: 1 })}
          >
            Add to bascket
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CarouselItem;
