
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/actions/user.actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { clerkId, email, firstName, lastName, username, photo } = req.body;

    if (!clerkId || !email || !username) {
      return res.status(400).json({ message: 'Missing required fields: clerkId, email, and username are required.' });
    }

    try {

      console.log('Creating user with data:', { clerkId, email, firstName, lastName, username, photo });

      const user = await createUser({ clerkId, email, firstName, lastName, username, photo });

      console.log('User successfully created:', user);

      res.status(201).json(user);
    } catch (error) {

      console.error('User creation failed:', error);

      res.status(500).json({ message: 'User creation failed', error});
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
