import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Employee {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
