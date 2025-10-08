import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/common/interceptors/feature/role.schemas';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseProductDto } from 'src/product/dto/response-product.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { RequestProductDto } from './dto/request-product.dto';
import { NotFoundError } from 'rxjs';

@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}

  @Public()
  @Post('/seed')
  @ApiOperation({ summary: 'popula o banco com produtos ficticios' })
  @ApiResponse({
    status: 201,
    description: 'produtos criados com sucesso',
    type: [ResponseProductDto],
  })
  async seedExProducts() {
    try {
      const products = await this.ProductService.seedProducts();
      return products.map((product) => new ResponseProductDto(product));
    } catch (error) {
      console.error('Failed to seed products:', error);
      throw new Error('Failed to seed products');
    }
  }

  @Get()
  @ApiOperation({ summary: 'lista todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos',
  })
  async findAllProducts(
    @Req() req: { product: { sub: string } },
  ): Promise<ProductEntity[]> {
    if (!req.product || !req.product.sub) {
      throw new UnauthorizedException('Produto não encontrado');
    }
    const productId = req.product.sub;
    try {
      return this.ProductService.findAllProducts(productId);
    } catch (error) {
      console.log('failed to find products', error);
      throw new InternalServerErrorException('erro ao buscar usuários');
    }
  }

  @Get(':field/:value')
  @ApiOperation({ summary: 'Retorna produto por um atributo' })
  @ApiResponse({
    status: 200,
    description: 'Busca um produto por seu atributo',
  })
  async findOneProduct(
    @Param('field') field: string,
    @Param('value') value: string,
    @Req() req: { product: { sub: string; id: string; name: string } },
  ) {
    try {
      const allowedFields = ['id', 'name', 'category', 'subcategory'];
      if (!allowedFields.includes(field)) {
        throw new BadRequestException(`campo inválido: ${field}.`);
      }

      const product = await this.ProductService.findOneProduct(field, value);
      if (!product) {
        throw new NotFoundException(
          `Nenhum produto encontrado com ${field}: ${value}`,
        );
      }
      return product;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar produto.');
    }
  }

  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<RequestProductDto>,
  ) {
    try {
      return await this.ProductService.updateProduct(id, updateProductDto);
    } catch (error) {
      console.log('Failed to update user:', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar produto.');
    }
  }

  @ApiOperation({ summary: 'Remover pelo id' })
  @ApiResponse({ status: 200, description: 'Produto deletado com sucesso' })
  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    try {
      return this.ProductService.removeProduct(id);
    } catch (error) {
      console.log('Failed to delete product');
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar produto.');
    }
  }
}
