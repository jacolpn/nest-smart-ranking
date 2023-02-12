import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
    imports: [
        JogadoresModule,
        MongooseModule.forRoot(
            'mongodb+srv://jaconeves:e3ab14f9@cluster0.bcegson.mongodb.net/?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                // useCreateIndex: true,
                useUnifiedTopology: true,
                // useFindAndModify: false,
            },
        ),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
