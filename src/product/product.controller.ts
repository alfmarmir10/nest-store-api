// ! The controller files are used for manage the routes (GET, POST, PUT, DELETE, etc).

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    console.log(createProductDTO);
    const createdProduct = await this.productService.createProduct(
      createProductDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product: createdProduct,
    });
  }

  @Get('/')
  async getProduct(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:productId')
  async getProductById(@Res() res, @Param('productId') productId) {
    const product = await this.productService.getProduct(productId);
    if (!product) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/delete/:productId')
  async deleteProductById(@Res() res, @Param('productId') productId) {
    const product = await this.productService.deleteProduct(productId);
    if (!product) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted successfully',
      product,
    });
  }

  @Put('/update/:productId')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('productId') productId,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      createProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product updated successfully',
      updatedProduct,
    });
  }
}
