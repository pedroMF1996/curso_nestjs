import { DynamicModule, Module } from '@nestjs/common';

export type MyDinamicModuleConfigs = {
  apiKey: string;
  apiUrl: string;
};

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class MyDynamicModule {
  static register(configs: MyDinamicModuleConfigs): DynamicModule {
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [{ provide: MY_DYNAMIC_CONFIG, useValue: configs }],
      controllers: [],
      exports: [],
      global: true,
    };
  }
  static forRoot(configs: MyDinamicModuleConfigs): DynamicModule {
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [{ provide: MY_DYNAMIC_CONFIG, useValue: configs }],
      controllers: [],
      exports: [],
      global: true,
    };
  }
  static async forRootAsync(configs): Promise<DynamicModule> {
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [{ provide: MY_DYNAMIC_CONFIG, useValue: configs }],
      controllers: [],
      exports: [],
      global: true,
    };
  }
}
