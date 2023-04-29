import { FC } from "react";
import { IProduct } from "types/product.interface";

import styles from "./ResultSeacrh.module.scss";
import { Link } from "react-router-dom";

const ResultSearch: FC<{ items: IProduct }> = ({ items }) => {
  const goProduct = "/product/".concat(String(items.id));
  return (
    <div className={styles.result}>
      <Link to={goProduct}>{items.name}</Link>
    </div>
  );
};

export default ResultSearch;
