
class Product {
    constructor(product_id, name, category_name, price, stock, image) {
      this.product_id = product_id;
      this.name = name;
      this.category_name = category_name;
      this.price = price;
      this.stock = stock;
      this.image = image;
    }
  
    static async getAllProducts() {
      try {
        const response = await fetch('http://localhost:8081/product'); 
        const products = await response.json();
        return products.map(productData => new Product(productData.product_id, productData.name, productData.category_name, productData.price, productData.stock,productData.image));
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }

  }
  
  export default Product;
