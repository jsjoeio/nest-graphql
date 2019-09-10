import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { join } from 'path';
import { PlaygroundController } from './playground/playground.controller';
import { PlaygroundModule } from './playground/playground.module';
import {
  hasRole,
  isAuthenticated,
  makeOneGraphJwtVerifier,
} from '@jsjoeio/onegraph-apollo-server-auth';

const ONEGRAPH_APP_ID = 'b6f3e649-0a7d-4a0d-a2a2-cade9d37f399';
const verifyJwtFromHeaders = makeOneGraphJwtVerifier(ONEGRAPH_APP_ID, {});


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
      schemaDirectives: {
        hasRole,
        isAuthenticated,
      },
      context: async incoming => {
        let jwtContext;

        // Extract and verify the JWT using OneGraph's helper function
        try {
          jwtContext = await verifyJwtFromHeaders(incoming.req.headers);
        } catch (e) { }

        // Now add any custom properties you'd like to have in addition to the JWT
        // context
        const context = { ...jwtContext, reqStart: Date.now() };
        return context;
      },
    }),
    EmployeeModule,
    PlaygroundModule,
  ],
  controllers: [PlaygroundController],
})
export class AppModule { }
