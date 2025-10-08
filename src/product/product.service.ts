import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { seedProducts } from 'src/product/entities/seed-products';
import { ResponseProductDto } from 'src/product/dto/response-product.dto';
import { RequestProductDto } from 'src/product/dto/request-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  async seedProducts(): Promise<ProductEntity[]> {
    const createdProducts: ProductEntity[] = [];

    for (const product of seedProducts) {
      const newProduct = { ...product };
      const savedProduct = await this.productsRepository.save(newProduct);
      createdProducts.push(savedProduct);
    }
    return createdProducts;
  }

  async createProduct(createproductDto: RequestProductDto) {
    try {
      const newProduct = await this.productsRepository.create({
        ...createproductDto,
      });
      return await this.productsRepository.save(newProduct);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new BadRequestException('Não foi possível criar o usuário.');
    }
  }

  async findAllProducts(productId: string): Promise<ProductEntity[]> {
    console.log('product id from service', productId);
    try {
      return await this.productsRepository.find({
        where: {
          id: productId,
        },
      });
    } catch (error) {
      console.log('erro ao buscar produtos', error);
      throw new InternalServerErrorException('erro ao buscar produtos');
    }
  }

  // async findOneProduct(id: string): Promise<ResponseProductDto> {
  //   try {
  //     const product = await this.productsRepository.findOne({
  //       where: {
  //         id: id,
  //       },
  //     });
  //     if (!product) {
  //       throw new NotFoundException(`Produto com o ${id} não encontrado.`);
  //     }
  //     return ResponseProductDto.fromProductEntity(product);
  //   } catch (error) {
  //     throw error instanceof NotFoundException
  //       ? error
  //       : new InternalServerErrorException('Erro ao buscar produto.');
  //   }
  // }

  async findOneProduct(
    field: string,
    value: string,
  ): Promise<ResponseProductDto> {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          [field]: value,
        },
      });
      if (!product) {
        throw new NotFoundException(
          `Produto com o ${field} : ${value} não encontrado.`,
        );
      }
      return ResponseProductDto.fromProductEntity(product);
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Erro ao buscar produto.');
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: Partial<RequestProductDto>,
  ) {
    console.log('Atualizando produto:', id, updateProductDto);
    try {
      const result = await this.productsRepository.update(id, updateProductDto);

      if (result.affected === 0) {
        throw new NotFoundException(
          `Produto com ID ${id} não encontrado para atualizar.`,
        );
      }
      return { message: 'Produto atualizado com sucesso' };
    } catch (error) {
      console.error('Erro real no update do produto:', error);
      throw new InternalServerErrorException('Erro ao atualizar produto.');
    }
  }

  async removeProduct(id: string) {
    try {
      console.log('product service', this.productsRepository);
      const result = await this.productsRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(
          `Produto com ID ${id} não encontrado para remover.`,
        );
      }
      return { message: 'Produto removido com sucesso' };
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Erro ao remover produto.');
    }
  }
}
