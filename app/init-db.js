import { getDB } from './getDB';
import fs from 'fs';
import path from 'path';

const initDB = async () => {
  const db = await getDB();

  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  await db.exec(schema);

  console.log('Database initialized successfully');
};

initDB().catch((err) => {
  console.error('Error initializing database:', err);
});