import pg from 'pg';

const projectRef = 'imgfgzvqfvgcomngmxoc';
const password = encodeURIComponent('EkjFvNIsaCyQEiXa');

async function testUsEast1() {
  const configs = [
    {
      name: 'Pooler 5432 (Session Mode)',
      url: `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`
    },
    {
      name: 'Pooler 6543 (Transaction Mode)',
      url: `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
    },
    {
      name: 'Pooler 5432 (User only)',
      url: `postgresql://postgres:${password}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`
    }
  ];

  for (const cfg of configs) {
    console.log(`Testando ${cfg.name}...`);
    const pool = new pg.Pool({
      connectionString: cfg.url,
      ssl: { rejectUnauthorized: false }
    });

    try {
      const client = await pool.connect();
      console.log(` SUCESSO com ${cfg.name}!`);
      const res = await client.query('SELECT NOW() as agora, version();');
      console.log(' Conectado! Resposta:', res.rows[0]);
      client.release();
      await pool.end();
      return cfg.url;
    } catch (err) {
      console.log(`❌ Erro em ${cfg.name}: ${err.message}`);
      await pool.end();
    }
  }
}

testUsEast1().then(conn => {
  if (conn) {
    console.log('\n URL FUNCIONANDO PERFEITAMENTE:\n', conn);
  }
});
