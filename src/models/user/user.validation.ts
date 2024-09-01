import { z } from 'zod';
import { TAddress, TFullName, TUser } from './user.interface';

export const FullNameSchemaValidation = z.object({
  firstName: z.string().refine(
    (value) => value.length > 0,
    { message: 'First name is required' }
  ),
  lastName: z.string().refine(
    (value) => value.length > 0,
    { message: 'Last name is required' }
  ),
});

export const AddressSchemaValidation = z.object({
  street: z.string().refine(
    (value) => value.length > 0,
    { message: 'Street is required' }
  ),
  city: z.string().refine(
    (value) => value.length > 0,
    { message: 'City is required' }
  ),
  country: z.string().refine(
    (value) => value.length > 0,
    { message: 'Country is required' }
  ),
});

export const UserSchemaValidation = z.object({
  userId: z.number().refine(
    (value) => value > 0,
    { message: 'User ID is required' }
  ),
  username: z.string().refine(
    (value) => value.length > 0,
    { message: 'Username is required' }
  ),
  password: z.string().refine(
    (value) => value.length > 0,
    { message: 'Password is required' }
  ),
  fullName: FullNameSchemaValidation,
  age: z.number().refine(
    (value) => value >= 0,
    { message: 'Age is required and must be non-negative' }
  ),
  email: z.string().email().refine(
    (value) => value.length > 0,
    { message: 'Email is required' }
  ),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressSchemaValidation,
});

export default UserSchemaValidation
