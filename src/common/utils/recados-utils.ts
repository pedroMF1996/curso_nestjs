import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosUtils {
  revertString(params: string) {
    return params.split('').reverse().join();
  }
}

@Injectable()
export class RecadosUtilsMock {
  revertString(params: string) {
    console.log('E UM MOCK');
  }
}
