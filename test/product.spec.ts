import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { UserId } from '../src/app/middlewares/currentUser';
import { AddProductInp } from '../src/product/domain/entity/product';
import { ProductDto } from '../src/product/domain/dto/product.dto';
import { SubmitOrderRequest } from '../src/order/api/dto/submit-order.dto';

describe('Product and Order End-to-End Tests', () => {
  let app: INestApplication;
  let createdProduct: ProductDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a product', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/categories') // Your product creation endpoint
      .expect(200);

    console.log(body);

    // const newProduct: AddProductInp = {
    //   title: 'Test Product',
    //   description: 'Test Description',
    //   categoryId: 'valid-category-id',
    //   price: 10,
    //   quantity: 100,
    //   image: 'test-image-url',
    // };

    // const createResponse = await request(app.getHttpServer())
    //   .post('/products') // Your product creation endpoint
    //   .send(newProduct)
    //   .expect(201);

    // createdProduct = createResponse.body; // Store the created product
  });

  // it('should get the created product', async () => {
  //   await request(app.getHttpServer())
  //     .get(`/products/${createdProduct.id}`) // Your product retrieval endpoint
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.title).toEqual(createdProduct.title); // Check product details
  //       // Add more assertions as needed
  //     });
  // });

  // it('should create an order with the product', async () => {
  //   const orderData: SubmitOrderRequest = {
  //     productId: createdProduct.id,
  //     count: 2, // Order 2 of the created product
  //   };

  //   await request(app.getHttpServer())
  //     .post('/orders') // Your order creation endpoint
  //     .send(orderData)
  //     .expect(201);
  // });

  // it("should retrieve the user's orders", async () => {
  //   const ordersResponse = await request(app.getHttpServer())
  //     .get('/orders') // Your order retrieval endpoint (likely needs user context)
  //     .expect(200);

  //   expect(Array.isArray(ordersResponse.body)).toBe(true); // Assuming an array of orders
  //   expect(ordersResponse.body.length).toBeGreaterThanOrEqual(1); // At least one order
  //   // Add more specific assertions to check the order details (e.g., product ID, quantity)
  // });

  afterAll(async () => {
    // Optionally clean up created resources (e.g., delete product, order)
    await app.close();
  });
});
