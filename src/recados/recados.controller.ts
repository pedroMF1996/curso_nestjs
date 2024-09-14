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

@Controller('recados')
export class RecadosController {
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  @HttpCode(HttpStatus.OK)
  @Get('q')
  findQueryParam(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    return `Essa rota retorna todos os recados limit:${limit} offset:${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') parametros: any) {
    console.log(parametros);
    return `Essa rota retorna o recado com o ID ${parametros}`;
  }

  @Post()
  create(@Body() bodyParam: any) {
    return bodyParam;
  }

  @Patch(':id')
  update(@Param() param: any, @Body() bodyParam: any) {
    return { param, bodyParam };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Essa rota apaga o recado com o ID ${id}`;
  }
}
