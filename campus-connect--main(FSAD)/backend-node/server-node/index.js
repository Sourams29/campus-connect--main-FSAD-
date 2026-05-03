import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT_NODE || 3001;

app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

// Health check
app.get('/api/node/health', (req, res) => {
  res.json({ status: 'ok', engine: 'Node.js', timestamp: new Date().toISOString() });
});

// Example route: Get all events via Node backend
app.get('/api/node/events', async (req, res) => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Node.js backend running on http://localhost:${PORT}`);
});
