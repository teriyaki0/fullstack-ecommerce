import Header from "./../../../components/layout/header/Header";

import { FC, useEffect, useState } from "react";

import styles from "./ProductDetail.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IProduct } from "types/product.interface";

const ProductDetail: FC = () => {
  type QuizParams = {
    id: string;
  };
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(response.data);
    };
    fetchData();
  }, []);
  const clickHandler = (id: number) => {
    return (event: React.MouseEvent) => {
      setActiveIndex(id);
      event.preventDefault();
    };
  };
  const { id } = useParams<QuizParams>();

  return (
    <div className={styles.product__detail}>
      <Header />
      <div className={styles.contain}>
        <h1 className={styles.title__page}>Product details</h1>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.text}>
              <div className={styles.title}>{product?.name}</div>
              <div className={styles.description}>{product?.description}</div>
            </div>

            <div className={styles.gallery}>
              {product?.image[1]
                ? product?.image.map((item, id) =>
                    item ? (
                      <img
                        src={`http://localhost:5173/${product?.image[id]}`}
                        alt={product?.name}
                        width={120}
                        onClick={clickHandler(id)}
                      />
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>
          </div>
          <div className={styles.image}>
            <img
              src={`http://localhost:5173/${product?.image[activeIndex]}`}
              alt={product?.name}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
