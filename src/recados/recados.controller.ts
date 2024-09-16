import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateReadDto } from './dto/update-recado.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.recadosService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('q')
  findQueryParam(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    return `Essa rota retorna todos os recados limit:${limit} offset:${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') parametros: number) {
    return this.recadosService.findOne(parametros);
  }

  @Post()
  create(@Body() bodyParam: CreateRecadoDto) {
    return this.recadosService.create(bodyParam);
  }

  @Patch(':id')
  update(@Param('id') param: number, @Body() bodyParam: UpdateReadDto) {
    return this.recadosService.update(param, bodyParam);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
