import { Injectable, NotFoundException } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId: number = 1;
  private recados: RecadoEntity[] = [
    {
      id: 1,
      texto: 'esse e um recado de teste',
      de: 'Joana',
      para: 'joao',
      lido: false,
      data: new Date(),
    },
  ];

  findAll(): RecadoEntity[] {
    return this.recados;
  }

  findOne(id: number): RecadoEntity {
    const recado = this.recados.find((x) => x.id === id);

    if (recado) return recado;

    this.throwNotFoundError();
  }

  create(recado: RecadoEntity): RecadoEntity {
    this.recados.push({ id: ++this.lastId, ...recado });

    return this.recados.find((x) => x.id === this.lastId);
  }

  update(id: number, recadoAtualizado: RecadoEntity) {
    const idExistente = this.recados.findIndex((x) => x.id === id);

    if (idExistente < 0) this.throwNotFoundError();

    const recadoASerAtualizado = this.recados[idExistente];

    this.recados[idExistente] = {
      ...recadoASerAtualizado,
      ...recadoAtualizado,
    };
  }

  remove(id: number) {
    const recadoExcluido = this.recados.findIndex((x) => x.id === id);

    if (recadoExcluido < 0) this.throwNotFoundError();

    this.recados.splice(recadoExcluido, 1);
  }

  private throwNotFoundError() {
    // throw new HttpException('Recado nao encontrado', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Recado nao encontrado');
  }
}
