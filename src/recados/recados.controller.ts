import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateReadDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.recadosService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('q')
  findQueryParam(@Query() pagination: PaginationDto) {
    return this.recadosService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) parametros: number) {
    return this.recadosService.findOne(parametros);
  }

  @Post()
  create(@Body() bodyParam: CreateRecadoDto) {
    return this.recadosService.create(bodyParam);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) param: number,
    @Body() bodyParam: UpdateReadDto,
  ) {
    return this.recadosService.update(param, bodyParam);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
