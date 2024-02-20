
class Product {
    constructor(product_id, name, category_name, price, stock) {
      this.product_id = product_id;
      this.name = name;
      this.category_name = category_name;
      this.price = price;
      this.stock = stock;
    }
  
    static async getAllProducts() {
      try {
        const response = await fetch('http://localhost:8081/product'); 
        const products = await response.json();
        return products.map(productData => new Product(productData.product_id, productData.name, productData.category_name, productData.price, productData.stock));
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }
  
    static async getProductById(productId) {
      try {
        const response = await fetch(`http://localhost:8081/product/${productId}`);
        const productData = await response.json();
        return new Product(productData.product_id, productData.name, productData.category_name, productData.price, productData.stock);
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
      }
    }
  
    async save() {
      try {
        const response = await fetch('http://localhost:8081/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: this.product_id, // Corrected property name
            name: this.name,
            category_name: this.category_name, // Corrected property name
            price: this.price,
            stock: this.stock, // Added missing property
          }),
        });
        const savedProductData = await response.json();
        return new Product(savedProductData.product_id, savedProductData.name, savedProductData.category_name, savedProductData.price, savedProductData.stock);
      } catch (error) {
        console.error('Error saving product:', error);
        throw error;
      }
    }
  
    async update() {
      try {
        const response = await fetch(`http://localhost:8081/product/${this.product_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            category_name: this.category_name, // Corrected property name
            price: this.price,
          }),
        });
        const updatedProductData = await response.json();
        return new Product(updatedProductData.product_id, updatedProductData.name, updatedProductData.category_name, updatedProductData.price, updatedProductData.stock);
      } catch (error) {
        console.error(`Error updating product with ID ${this.product_id}:`, error);
        throw error;
      }
    }
  
    async delete() {
      try {
        await fetch(`http://localhost:8081/products/${this.product_id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(`Error deleting product with ID ${this.product_id}:`, error);
        throw error;
      }
    }
  }
  
  export default Product;
