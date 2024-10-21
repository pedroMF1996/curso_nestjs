import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateReadDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class RecadosService {
  /**
   *
   */
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadosRepository: Repository<RecadoEntity>,
    @Inject() private readonly pessoaService: PessoasService,
  ) {}

  async findAll(paginationDTO?: PaginationDto | null): Promise<RecadoEntity[]> {
    let limit = 10;
    let offset = 0;
    if (paginationDTO) {
      limit = paginationDTO.limit;
      offset = paginationDTO.offset;
    }

    const recados = await this.recadosRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: {
        id: 'DESC',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    return recados;
  }

  async findOne(id: number): Promise<RecadoEntity> {
    const recado = await this.recadosRepository.findOne({
      relations: ['de', 'para'],
      where: {
        id,
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create(recado: CreateRecadoDto): Promise<RecadoEntity> {
    const [emissor, receptor] = await this.ObterDePara(recado);

    const novoRecado = await this.recadosRepository.create({
      texto: recado.texto,
      de: emissor,
      para: receptor,
      lido: false,
      data: new Date(),
    });

    return await this.recadosRepository.save(novoRecado);
  }

  async update(id: number, recadoAtualizado: UpdateReadDto) {
    const recado = await this.findOne(id);

    recado.texto = recadoAtualizado.texto ?? recado.texto;
    recado.lido = recadoAtualizado.lido ?? recado.lido;

    await this.recadosRepository.save(recado);

    return recado;
  }

  private async ObterDePara(
    recadoAtualizado: CreateRecadoDto | UpdateReadDto,
  ): Promise<Pessoa[]> {
    const de = await this.pessoaService.findOne(recadoAtualizado.deId);
    const para = await this.pessoaService.findOne(recadoAtualizado.paraId);
    return [de, para];
  }

  async remove(id: number) {
    const recado = await this.findOne(id);

    return await this.recadosRepository.remove(recado);
  }

  private throwNotFoundError() {
    // throw new HttpException('Recado nao encontrado', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Recado nao encontrado');
  }
}
