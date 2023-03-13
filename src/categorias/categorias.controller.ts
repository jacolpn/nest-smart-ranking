import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriaService: CategoriasService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto,
    ): Promise<Categoria> {
        return await this.categoriaService.criarCategoria(criarCategoriaDto);
    }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaService.consultarTodasCategorias();
    }

    @Get('/:categoria')
    async consultarCategoriaPeloId(
        @Param('categoria') categoria: string,
    ): Promise<Categoria> {
        return await this.categoriaService.consultarCategoriaPeloId(categoria);
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategorias(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param('categoria') categoria: string,
    ): Promise<void> {
        await this.categoriaService.atualizarCategorias(
            categoria,
            atualizarCategoriaDto,
        );
    }

    @Post('/:categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
        console.log('jacks', JSON.stringify(params));
        return await this.categoriaService.atribuirCategoriaJogador(params);
    }
}
