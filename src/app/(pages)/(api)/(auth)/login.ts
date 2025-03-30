import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const users = [
  { id: 1, username: 'john', password: '$2a$10$7QJ8Q9J8Q9J8Q9J8Q9J8QO' }, // password: 'password'
];

const secret = 'your_jwt_secret';

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
}

  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });

  res.status(200).json({ token });
};

export default loginHandler;