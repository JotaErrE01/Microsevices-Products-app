import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/shared';
import { PrismaService } from 'src/config/db/prisma.service';

@Injectable()
export class ProductsService {
  private readonly product: PrismaService['product'];

  constructor(prisma: PrismaService) {
    this.product = prisma.product;
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  async findAll(pagintaionDto: PaginationDto) {
    const { page = 1, limit = 10 } = pagintaionDto;

    const data = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = await this.product.count();
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data,
      currentPage: page,
      lastPage,
      totalPages,
    };
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException();
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.product.softDelete({ where: { id } });
  }
}
