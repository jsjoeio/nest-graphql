import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { join } from 'path';
import { PlaygroundController } from './playground/playground.controller';
import { PlaygroundModule } from './playground/playground.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
    }),
    EmployeeModule,
    PlaygroundModule,
  ],
  controllers: [PlaygroundController],
})
export class AppModule {}
