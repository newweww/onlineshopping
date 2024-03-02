import React, { useEffect, useState } from "react";
import Card from "../../component/card";
import { useParams } from "react-router-dom";
import Product from "../../component/product";

function CategoryPage() {
  const { category_name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await Product.getAllProducts();
        const categoryData = productsData.filter(
          (product) => product.category_name === category_name
        );
        setData(categoryData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [category_name]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const cardStyle = {
    flex: "0 0 calc(30% - 20px)",
    marginBottom: "20px",
    boxSizing: "border-box",
  };

  return (
    <div className="container border shadow my-3" style={{ paddingBottom: '50px' }}>
      <h1 className="text-start container-fluid p-3">{category_name}</h1>
      <div className="px-5">
        <div style={cardContainerStyle}>
          {data.map((item, index) => (
            <div key={index} style={cardStyle}>
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
