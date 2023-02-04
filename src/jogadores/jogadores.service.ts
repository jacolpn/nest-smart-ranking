import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/cria-jogador.dto';
import { v4 as uuidv4 } from 'uuid';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
    private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criaJgadorDto: CriarJogadorDto) {
        const { email } = criaJgadorDto;
        const jogadorEncontrado = this.jogadores.find(
            (jogador: Jogador) => jogador.email === email,
        );

        if (jogadorEncontrado) {
            return this.atualizar(jogadorEncontrado, criaJgadorDto);
        }

        return this.criar(criaJgadorDto);
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }

    async consultaJogadoresPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = this.jogadores.find(
            (jogador: Jogador) => jogador.email === email,
        );

        if (!jogadorEncontrado) {
            throw new NotFoundException(
                `Jogador com e-mail ${email} não foi encontrado!`,
            );
        }

        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<void> {
        const jogadorEncontrado = this.jogadores.find(
            (jogador: Jogador) => jogador.email === email,
        );

        if (!jogadorEncontrado) {
            throw new NotFoundException(
                `Jogador com e-mail ${email} não foi encontrado!`,
            );
        }

        this.jogadores = this.jogadores.filter(
            (jogador: Jogador) => jogador.email !== jogadorEncontrado.email,
        );
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criaJogadorDto;
        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg',
        };

        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);

        this.jogadores.push(jogador);
    }

    private atualizar(
        jogadorEncontrado: Jogador,
        criarJogadorDto: CriarJogadorDto,
    ): void {
        const { nome } = criarJogadorDto;

        jogadorEncontrado.nome = nome;
    }
}
