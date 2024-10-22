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
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateReadDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PipeIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';
import { ChangeDataInterceptor } from 'src/common/interceptors/change-data.interceptor';

@Controller('recados')
@UseInterceptors(ErrorHandlingInterceptor)
@UseInterceptors(ChangeDataInterceptor)
@UsePipes(PipeIntIdPipe)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseInterceptors(TimingConnectionInterceptor)
  async findAll() {
    return await this.recadosService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('q')
  findQueryParam(@Query() pagination: PaginationDto) {
    return this.recadosService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() bodyParam: CreateRecadoDto) {
    return this.recadosService.create(bodyParam);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() bodyParam: UpdateReadDto) {
    return this.recadosService.update(id, bodyParam);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
