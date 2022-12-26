import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
//import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {}

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product])
  @UseGuards(JwtAuthGuard)
  products() {
    return this.productService.findAllProducts();
  }

  @Query(() => [Product])
  @UseGuards(JwtAuthGuard)
  searchProductsByName(@Args('name') name: string) {
    return this.productService.findByName(name);
  }

  @Query(() => [Product])
  @UseGuards(JwtAuthGuard)
  searchProductsByCategory(@Args('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productService.update(updateProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }

  @ResolveField()
  async category(@Parent() product: Product) {
    const { id } = product;
    const cat = await this.productService.findById(id);
    const result = await this.categoryService.findProductCategory(cat.categoryId);
    // return this.categoryService.findProductCategory(id);
    return result;
  }


}
