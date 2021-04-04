import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly productsRepository: Repository<Product>;
  constructor(
    @Inject('TENANT_CONNECTION')
    tenantConnection,
  ) {
    this.productsRepository = tenantConnection.getRepository(Product);
  }

  async create(createProductDto: CreateProductDto) {
    const createdProduct = this.productsRepository.create(createProductDto);

    return await this.productsRepository.save(createdProduct);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    return await this.productsRepository.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.productsRepository.softDelete(id);
  }
}
