import { JogadoresService } from './jogadores.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    // Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import { CriarJogadorDto } from './dtos/cria-jogador.dto';

import { Jogador } from './interfaces/jogador.interface';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto,
    ): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', ValidacaoParametrosPipe) _id: string,
    ): Promise<void> {
        // const { email } = criarJogadorDto;
        // return JSON.stringify({ email: email });

        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // async criarAtualizarJogador(
    //     @Body() criarJogadorDto: CriarJogadorDto,
    // ): Promise<any> {
    //     // const { email } = criarJogadorDto;
    //     // return JSON.stringify({ email: email });

    //     await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    // }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadoresPeloId(
        @Param('_id', ValidacaoParametrosPipe) _id: string,
    ): Promise<Jogador> {
        return await this.jogadoresService.consultarJogadorPeloId(_id);
    }

    // @Get()
    // async consultarJogadores(
    //     @Query('email', JogadoresValidacaoParametrosPipe) email: string,
    // ): Promise<Jogador[] | Jogador> {
    //     if (email) {
    //         return await this.jogadoresService.consultaJogadoresPeloEmail(
    //             email,
    //         );
    //     }

    //     return await this.jogadoresService.consultarTodosJogadores();
    // }

    // @Delete()
    // async deletarJogador(
    //     @Query('email', JogadoresValidacaoParametrosPipe)
    //     email: string,
    // ): Promise<void> {
    //     return await this.jogadoresService.deletarJogador(email);
    // }

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', ValidacaoParametrosPipe)
        _id: string,
    ): Promise<void> {
        return await this.jogadoresService.deletarJogador(_id);
    }
}
