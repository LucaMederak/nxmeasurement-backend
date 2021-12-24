import { object, number, string, TypeOf, z } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    last_name: string({
      required_error: 'Surname is required',
    }),
    sex: z.enum(['mężczyzna', 'kobieta']),
    age: number({
      required_error: 'Age is required',
    }).min(1, 'Age too short - should be 1 year minimum'),
    email: string().email('Not a valid email').optional(),
    avatar: string().optional(),
  }),
};

const params = {
  params: object({
    clientId: string({
      required_error: 'clientId is required',
    }),
  }),
};

export const createClientSchema = object({
  ...payload,
});

export const updateClientSchema = object({
  ...payload,
  ...params,
});

export const deleteClientSchema = object({
  ...params,
});

export const getClientSchema = object({
  ...params,
});

export type CreateClientInput = TypeOf<typeof createClientSchema>;
export type UpdateClientInput = TypeOf<typeof updateClientSchema>;
export type GetClientInput = TypeOf<typeof getClientSchema>;
export type DeleteClientInput = TypeOf<typeof deleteClientSchema>;
