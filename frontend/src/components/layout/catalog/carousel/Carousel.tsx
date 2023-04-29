import { FC, useState } from "react";
import { IProduct } from "types/product.interface";
import CarouselItem from "./carousel-item/CarouselItem";
import styles from "./Carousel.module.scss";

const Carousel: FC<{ product: IProduct[] }> = ({ product }) => {
  const [isActive, setIsActive] = useState(2);
  return (
    <div>
      <div className={styles.carousel}>
        {product.map((products, index) => (
          <CarouselItem
            key={products.id}
            product={products}
            active={products.id === isActive}
            selectActive={() => setIsActive(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
export default Carousel;
