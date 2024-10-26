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
import { HashingServiceProtocol } from 'src/auth/hashing/ashing.service';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const partialPessoa = await this.GeneratePartialPessoa(createPessoaDto);

      const pessoa = await this.pessoaRepository.create(partialPessoa);

      return this.pessoaRepository.save(pessoa);
    } catch (error) {
      if (error.code == '23505')
        throw new ConflictException('Email ja esta cadastrado');

      throw error;
    }
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.pessoaRepository.preload({
      id,
      ...(await this.GeneratePartialPessoa(updatePessoaDto)),
    });

    this.ValidarPessoaNaoEncontrada(pessoa);

    return this.pessoaRepository.save(pessoa);
  }

  private async GeneratePartialPessoa(dto: CreatePessoaDto | UpdatePessoaDto) {
    const res = {
      email: dto.email,
      nome: dto.nome,
    };

    if (dto?.password)
      res['passwordHash'] = await this.hashingService.hash(dto.password);

    return res;
  }

  async findAll() {
    return await this.pessoaRepository.find();
  }

  async findOne(id: number) {
    return this.pessoaRepository.findOneBy({ id });
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
