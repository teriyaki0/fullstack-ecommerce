import { FC, useEffect, useState } from "react";
import styles from "./Search.module.scss";

import ResultSearch from "./result/ResultSearch";
import axios from "axios";

const Search: FC = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/product?search_query=${search}`
      );
      setProduct(response.data);
    };
    fetchData();
  }, [search]);

  return (
    <div className={styles.root}>
      <div>
        <input
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className={styles.input}
          placeholder='Search'
        />
        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            id='Outline'
            viewBox='0 0 24 24'
            width='45'
            height='45'
            className={styles.icon}
          >
            <path d='M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z' />
          </svg>
        </button>
      </div>

      {search ? (
        <div className={styles.result}>
          {product.map((item) => (
            <ResultSearch items={item} key={item} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
