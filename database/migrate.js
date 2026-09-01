import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres:EkjFvNIsaCyQEiXa@db.imgfgzvqfvgcomngmxoc.supabase.co:5432/postgres';

console.log(' Conectando ao Supabase PostgreSQL...');

const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runMigrations() {
  const client = await pool.connect();
  try {
    console.log(' Conectado com sucesso ao Supabase!');

    // 1. Executar 01_schema.sql
    console.log(' Aplicando 01_schema.sql (pgvector, tabelas, funções)...');
    const schemaSql = fs.readFileSync(path.join(__dirname, '01_schema.sql'), 'utf-8');
    await client.query(schemaSql);
    console.log(' Schema aplicado com sucesso!');

    // 2. Executar 02_seed.sql
    console.log(' Aplicando 02_seed.sql (categorias, intenções, produtos)...');
    const seedSql = fs.readFileSync(path.join(__dirname, '02_seed.sql'), 'utf-8');
    await client.query(seedSql);
    console.log(' Seed de dados aplicado com sucesso!');

    // 3. Verificando dados inseridos
    const intentionsRes = await client.query('SELECT count(*) FROM intentions;');
    const productsRes = await client.query('SELECT count(*) FROM products;');
    const categoriesRes = await client.query('SELECT count(*) FROM categories;');

    console.log('\n Status do Banco de Dados:');
    console.log(`- Intenções cadastradas: ${intentionsRes.rows[0].count}`);
    console.log(`- Produtos cadastrados: ${productsRes.rows[0].count}`);
    console.log(`- Categorias cadastradas: ${categoriesRes.rows[0].count}`);
    console.log('\n Migração concluída com sucesso!');
  } catch (error) {
    console.error(' Erro ao aplicar migrações:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
