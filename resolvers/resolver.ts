import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateClientInput, EditClientInput } from "../inputs/ClientInput";
import { Client } from "../models/client";
import { ClientMongo } from "../mongodb/models/client";

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  async clients() {
    return await ClientMongo.find();
  }

  @Query(() => Client)
  async client(@Arg("id") id: string) {
    return await ClientMongo.findOne({ _id: id });
  }

  @Mutation(() => Client)
  async createClient(
    @Arg("createClientObject") createClientObject: CreateClientInput
  ) {
    const { adress, cpf, email, name, tel } = createClientObject;

    return await ClientMongo.create({
      name,
      email,
      adress,
      cpf,
      tel,
    });
  }

  @Mutation(() => Client)
  async editClient(@Arg("editClientObject") editClientObject: EditClientInput) {
    const client = { ...editClientObject };

    await ClientMongo.updateOne({ _id: client.id }, client);

    return client;
  }

  @Mutation(() => String)
  async deleteClient(@Arg("id") id: string) {
    await ClientMongo.deleteOne({ _id: id });

    return id;
  }
}
