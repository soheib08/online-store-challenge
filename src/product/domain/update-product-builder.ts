import { ProductProps } from './entity/product';

export class ProductUpdateBuilder {
  private updates: Partial<ProductProps> = {};

  setName(title?: string): ProductUpdateBuilder {
    if (title) this.updates.title = title;
    return this;
  }

  setDescription(description?: string): ProductUpdateBuilder {
    if (description) this.updates.description = description;
    return this;
  }

  setPrice(price?: number): ProductUpdateBuilder {
    if (price) this.updates.price = price;
    return this;
  }

  setQuantity(quantity?: number): ProductUpdateBuilder {
    if (quantity) this.updates.quantity = quantity;
    return this;
  }

  setImage(image?: string): ProductUpdateBuilder {
    if (image) this.updates.image = image;
    return this;
  }

  build(): Partial<ProductProps> {
    return this.updates;
  }
}
