import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/actions/user.actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { clerkId, email, username, firstName, lastName, photo } = req.body;

    try {
      console.log('Creating user...');
      const user = await createUser({ clerkId, email, username, firstName, lastName, photo });
      console.log('User successfully created:', user);
      res.status(201).json(user);
    } catch (error) {
      console.error('User creation failed:', error);
      res.status(500).json({ message: error});
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
