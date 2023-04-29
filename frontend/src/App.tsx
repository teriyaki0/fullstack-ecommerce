import { Route, Routes } from "react-router-dom";
import Home from "./components/screens/home/Home";
import ProductDetail from "./components/screens/product-detail/ProductDetail";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:5000/api/products");
      setProduct(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home products={product} />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
