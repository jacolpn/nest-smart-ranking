import {
    Injectable,
    Logger,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

import { CriarJogadorDto } from './dtos/cria-jogador.dto';

import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
    // private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name);

    constructor(
        @InjectModel('Jogador') private readonly jogadorModule: Model<Jogador>,
    ) {}

    // async criarAtualizarJogador(criaJgadorDto: CriarJogadorDto) {
    //     const { email } = criaJgadorDto;

    //     // const jogadorEncontrado = this.jogadores.find(
    //     //     (jogador: Jogador) => jogador.email === email,
    //     // );

    //     const jogadorEncontrado = await this.jogadorModule
    //         .findOne({ email })
    //         .exec();

    //     if (jogadorEncontrado) {
    //         // return this.atualizar(jogadorEncontrado, criaJgadorDto);
    //         return this.atualizar(criaJgadorDto);
    //     }

    //     return this.criar(criaJgadorDto);
    // }

    async criarJogador(criaJgadorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = criaJgadorDto;

        const jogadorEncontrado = await this.jogadorModule
            .findOne({ email })
            .exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(
                `Jogador com e-mail ${email} já cadastrado`,
            );
        }

        const jogadorCriado = new this.jogadorModule(criaJgadorDto);

        return await jogadorCriado.save();
    }

    async atualizarJogador(
        _id: string,
        atualizarJogadorDto: AtualizarJogadorDto,
    ): Promise<void> {
        const jogadorEncontrado = await this.jogadorModule
            .findOne({ _id })
            .exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        await this.jogadorModule
            .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
            .exec();
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        // return this.jogadores;
        return this.jogadorModule.find().exec();
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModule
            .findOne({ _id })
            .exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(
                `Jogador com id ${_id} não foi encontrado!`,
            );
        }

        return jogadorEncontrado;
    }

    async deletarJogador(_id: string): Promise<any> {
        const jogadorEncontrado = await this.jogadorModule
            .findOne({ _id })
            .exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(
                `Jogador com id ${_id} não foi encontrado!`,
            );
        }

        return await this.jogadorModule.deleteOne({ _id }).exec();
    }

    // async consultaJogadoresPeloEmail(email: string): Promise<Jogador> {
    //     // const jogadorEncontrado = this.jogadores.find(
    //     //     (jogador: Jogador) => jogador.email === email,
    //     // );

    //     const jogadorEncontrado = await this.jogadorModule
    //         .findOne({ email })
    //         .exec();

    //     if (!jogadorEncontrado) {
    //         throw new NotFoundException(
    //             `Jogador com e-mail ${email} não foi encontrado!`,
    //         );
    //     }

    //     return jogadorEncontrado;
    // }

    // async deletarJogador(email: string): Promise<any> {
    //     // const jogadorEncontrado = this.jogadores.find(
    //     //     (jogador: Jogador) => jogador.email === email,
    //     // );

    //     // if (!jogadorEncontrado) {
    //     //     throw new NotFoundException(
    //     //         `Jogador com e-mail ${email} não foi encontrado!`,
    //     //     );
    //     // }

    //     // this.jogadores = this.jogadores.filter(
    //     //     (jogador: Jogador) => jogador.email !== jogadorEncontrado.email,
    //     // );

    //     return await this.jogadorModule.deleteOne({ email }).exec();
    // }

    // private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    //     // const { nome, telefoneCelular, email } = criaJogadorDto;
    //     // const jogador: Jogador = {
    //     //     _id: uuidv4(),
    //     //     nome,
    //     //     telefoneCelular,
    //     //     email,
    //     //     ranking: 'A',
    //     //     posicaoRanking: 1,
    //     //     urlFotoJogador: 'www.google.com.br/foto123.jpg',
    //     // };

    //     // this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);

    //     // this.jogadores.push(jogador);

    //     const jogadorCriado = new this.jogadorModule(criaJogadorDto);

    //     return await jogadorCriado.save();
    // }

    // private async atualizar(
    //     criarJogadorDto: CriarJogadorDto,
    // ): Promise<Jogador> {
    //     // const { nome } = criarJogadorDto;

    //     // jogadorEncontrado.nome = nome;

    //     return await this.jogadorModule
    //         .findOneAndUpdate(
    //             { email: criarJogadorDto.email },
    //             { $set: criarJogadorDto },
    //         )
    //         .exec();
    // }
}
