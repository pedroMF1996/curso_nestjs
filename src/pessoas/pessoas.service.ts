import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const partialPessoa = this.GeneratePartialPessoa(createPessoaDto);

    try {
      const pessoa = await this.pessoaRepository.create(partialPessoa);

      return this.pessoaRepository.save(pessoa);
    } catch (error) {
      if (error.code == '23505')
        throw new ConflictException('Email ja esta cadastrado');

      throw error;
    }
  }

  private GeneratePartialPessoa(
    createPessoaDto: CreatePessoaDto | UpdatePessoaDto,
  ) {
    return {
      email: createPessoaDto.email,
      nome: createPessoaDto.nome,
      passwordHash: createPessoaDto.password,
    };
  }

  async findAll() {
    return await this.pessoaRepository.find();
  }

  async findOne(id: number) {
    return this.pessoaRepository.findOneBy({ id });
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.pessoaRepository.preload({
      id,
      ...this.GeneratePartialPessoa(updatePessoaDto),
    });

    this.ValidarPessoaNaoEncontrada(pessoa);

    return this.pessoaRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });

    this.ValidarPessoaNaoEncontrada(pessoa);

    return await this.pessoaRepository.remove(pessoa);
  }

  private ValidarPessoaNaoEncontrada(pessoa: Pessoa | null) {
    if (!pessoa) throw new NotFoundException('Pessoa nao encontrada');
  }
}
