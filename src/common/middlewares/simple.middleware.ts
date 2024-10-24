import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    if (req.headers?.authorization) {
      req['user'] = {
        nome: 'Pedro',
        sobreNome: 'Martins Falleiros',
        role: 'admin',
      };
    }

    res.setHeader('Cabecalho', 'Do Middleware');

    //Terminando a cadeia de chamadas
    // return res.status(404).send({ message: 'Nao encontrado' });
    next();

    res.on('finish', () => {});
  }
}
