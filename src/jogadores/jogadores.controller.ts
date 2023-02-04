import { JogadoresService } from './jogadores.service';
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/cria-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService) {}

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto,
    ): Promise<any> {
        // const { email } = criarJogadorDto;
        // return JSON.stringify({ email: email });

        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string,
    ): Promise<Jogador[] | Jogador> {
        if (email) {
            return await this.jogadoresService.consultaJogadoresPeloEmail(
                email,
            );
        }

        return await this.jogadoresService.consultarTodosJogadores();
    }

    @Delete()
    async deletarJogador(@Query('email') email: string): Promise<void> {
        return await this.jogadoresService.deletarJogador(email);
    }
}
