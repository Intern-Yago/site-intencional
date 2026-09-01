import dns from 'dns';

const resolver = new dns.promises.Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);

async function testDns() {
  const host = 'imgfgzvqfvgcomngmxoc.supabase.co';
  console.log(`Consultando DNS para ${host} nos servidores 8.8.8.8 / 1.1.1.1...`);
  try {
    const addresses = await resolver.resolve4(host);
    console.log('IPv4 resolvido:', addresses);
  } catch (e: any) {
    console.log('Erro IPv4:', e.message);
  }

  try {
    const addresses6 = await resolver.resolve6(host);
    console.log('IPv6 resolvido:', addresses6);
  } catch (e: any) {
    console.log('Erro IPv6:', e.message);
  }
}

testDns();
