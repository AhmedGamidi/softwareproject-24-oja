'use server'

import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import Order from '@/lib/database/models/order.model';
import Event from '@/lib/database/models/event.model';

import { CreateUserParams, UpdateUserParams } from '@/types';
import { handleError } from '@/lib/utils';

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);

    console.log('User created successfully:', newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {

    console.error('Error creating user:', error);

    handleError(error);
    throw new Error('User creation failed');
  }
};

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');
    return JSON.parse(JSON.stringify(user));
  } catch (error) {

    console.error('Error fetching user by ID:', error);

    handleError(error);
    throw new Error('User retrieval failed');
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });

    if (!updatedUser) throw new Error('User update failed');

    console.log('User updated successfully:', updatedUser);
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {

    console.error('Error updating user:', error);
    
    handleError(error);
    throw new Error('User update failed');
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error('User not found');
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath('/');

    console.log('User deleted successfully:', deletedUser);

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {

    console.error('Error deleting user:', error);
    
    handleError(error);
    throw new Error('User deletion failed');
  }
}
const newUser: CreateUserParams = {
  clerkId: '1',
  firstName: 'Oluwamayokun',
  lastName: 'Sofowora',
  username: 'mayokun',
  email: 'sofoworamayokun@gmail.com',
  photo: ''
};

createUser(newUser)
  .then(savedUser => {
    console.log('User created successfully:', savedUser);
  })
  .catch(error => {
    console.error('Error creating user:', error);
  });