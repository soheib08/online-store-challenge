import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app/app.module';
import { ProductDto } from 'src/product/domain/dto/product.dto';
import { AddProductInp } from 'src/product/domain/entity/product';
import { SubmitOrderRequest } from 'src/order/api/dto/submit-order.dto';

describe('Product and Order End-to-End Tests', () => {
  let app: INestApplication;
  let product: ProductDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a product', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);

    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data[0]?.id).toBeDefined();

    const categoryId = body?.data[0]?.id;
    const newProduct: AddProductInp = {
      title: 'Test Product',
      description: 'Test Description',
      categoryId: categoryId,
      price: 10,
      quantity: 100,
      image: 'test-image-url',
    };

    await request(app.getHttpServer())
      .post('/products')
      .send(newProduct)
      .expect(201);
  });

  it('should get the created product', async () => {
    let { body } = await request(app.getHttpServer())
      .get(`/products`)
      .expect(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data[0].id).toBeDefined();

    const productId = body.data[0].id;
    const getProductResult = await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .expect(200);
    expect(getProductResult.body.data.title).toBe(body.data[0].title);

    product = getProductResult.body.data;
  });

  it('should create an order with the product', async () => {
    const orderData: SubmitOrderRequest = {
      productId: product.id,
      count: 2,
    };

    await request(app.getHttpServer())
      .post('/orders/purchase')
      .send(orderData)
      .expect(201);
  });

  it("should retrieve the user's orders", async () => {
    const { body } = await request(app.getHttpServer())
      .get('/orders')
      .expect(200);

    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThanOrEqual(1);
    expect(body.data[0].productId).toBe(product.id);
  });

  afterAll(async () => {
    await app.close();
  });
});
