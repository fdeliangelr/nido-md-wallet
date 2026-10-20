import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Cargamos las variables de entorno desde .env.local
dotenv.config({ path: '.env.local' });

export default {
  schema: './src/lib/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;