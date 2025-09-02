import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/common/interceptors/feature/role.schemas';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseProductDto } from 'src/product/dto/response-product.dto';
import { ProductEntity } from 'src/product/entities/product.entity';

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

  @Get(':id')
  @ApiOperation({ summary: 'Retorna produto pelo id' })
  @ApiResponse({ status: 200, description: 'Busca um produto por id' })
  async findOneProduct(
    @Param('id') id: string,
    @Req() req: { product: { sub: string; id: string } },
  ) {
    try {
      const product = await this.ProductService.findOneProduct(id);
      return product;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar usuário.');
    }
  }
}
