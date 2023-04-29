import { FC, useEffect, useState } from "react";
import axios from "axios";

import Header from "./../../layout/header/Header";

import styles from "./Home.module.scss";
import Catalog from "./../../layout/catalog/Catalog";
import { IProduct } from "types/product.interface";

const Home: FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.title}>
        <h1>The happiest hour of the year</h1>
        <p>
          From hot and rich to cold and refreshing beverages for you to
          discover, love and enjoy.
        </p>
      </div>
      <Catalog products={products} />
    </div>
  );
};

export default Home;
