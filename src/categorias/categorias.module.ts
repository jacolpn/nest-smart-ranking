import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interfaces/categoria.schema';
import { JogadoresModule } from '../jogadores/jogadores.module';

@Module({
    controllers: [CategoriasController],
    providers: [CategoriasService],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Categoria',
                schema: CategoriaSchema,
            },
        ]),
        JogadoresModule,
    ],
})
export class CategoriasModule {}
