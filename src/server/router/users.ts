import express from 'express';
import {
  comparePasswords,
  create,
  findUserByUsernameWithPassword,
  getUserById,
} from '../db/models/users';
const router = express.Router();

router.use(express.json());
router.post('/register', async (req, res) => {
  const { username, name, last_name, mail, password, repeat_password } =
    req.body;

  const array = [username, name, last_name, mail, password, repeat_password];
  if (array.filter((e) => !e).length) {
    return res.status(400).send({ error: 'One of the fileds is missing' });
  }
  if (!mail.includes('@')) {
    return res.status(400).send({ error: 'Invalid mail' });
  }
  if (password !== repeat_password) {
    return res.status(400).send({ error: 'Password do not match' });
  }

  const user = await create({ username, name, last_name, mail, password });
  res.json({ data: user });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const array = [username, password];
  if (array.filter((e) => typeof e !== 'string').length) {
    return res.status(400).send({ error: 'One of the fileds is missing' });
  }

  const user = await findUserByUsernameWithPassword(username);
  const r = () => res.json({ error: 'Wrong username or password!' });

  if (user) {
    const ok = comparePasswords(user.password, password);
    if (ok) {
      req.session.userId = user.id;
      res.json({ data: user });
    } else {
      return r();
    }
  } else {
    return r();
  }
});

router.post('/logout', async (req, res) => {
  if (req.session.userId) {
    req.session.destroy(() => {
      res.json({ data: 'success' });
    });
  } else {
    res.json({ error: 'Not logged in' });
  }
});

router.post('/check', async (req, res) => {
  if (req.session.userId) {
    const user = await getUserById(req.session.userId);
    res.json({ data: user });
  } else {
    res.status(401).json({ error: 'Not looged in' });
  }
});
router.post('*', (req, res) => res.status(404).json({ error: 'Not found' }));
export default router;
