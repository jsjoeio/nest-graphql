import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { join } from 'path';
import { PlaygroundController } from './playground/playground.controller';
import { PlaygroundModule } from './playground/playground.module';
import {
  makeOneGraphJwtVerifier,
  isAuthenticated,
  hasRole,
  extractBearerToken,
} from '@jsjoeio/onegraph-apollo-server-auth';

const ONEGRAPH_APP_ID = 'b6f3e649-0a7d-4a0d-a2a2-cade9d37f399';
const verifyJwt = makeOneGraphJwtVerifier(ONEGRAPH_APP_ID, {});

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
      schemaDirectives: {
        isAuthenticated,
        hasRole,
      },
      introspection: true,
      context: async incoming => {
        // Anything else you'd like in the resolver context goes here.
        let context = {};

        // Extract the JWT using OneGraph's helper function
        const token = extractBearerToken(incoming.req);

        if (!token) {
          return { ...context, jwt: null };
        }

        // If we have a token, try to decode and verify it using either
        // public/private or shared-secret, depending on the preference
        // stored in the JWT. If we fail, discard the token and return
        // a mostly-empty context
        try {
          const decoded = await verifyJwt(token).catch(rejection =>
            console.warn(`JWT verification failed: `, rejection),
          );
          return { ...context, jwt: decoded };
        } catch (rejection) {
          console.warn(rejection);
          return { ...context, jwt: null };
        }
      },
    }),
    EmployeeModule,
    PlaygroundModule,
  ],
  controllers: [PlaygroundController],
})
export class AppModule { }
