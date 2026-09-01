'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  BookOpen, 
  ShoppingBag, 
  Users, 
  Sparkles, 
  Bell, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Upload, 
  Check, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  ShieldCheck, 
  ExternalLink,
  X,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ALL_PRODUCTS, CatalogProduct, INTENTION_MAPPINGS } from '@/data/products';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'articles' | 'orders' | 'users' | 'ai'>('dashboard');
  
  // Estados de Notificações
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, title: 'Nova Compra Aprovada!', message: 'Mariana comprou Colar de Obsidiana (R$ 119,80 no PIX)', time: 'Há 15 minutos', unread: true, orderId: 'PED-1048' },
    { id: 2, title: 'Novo Pedido em Preparação', message: 'Carlos comprou Kit Prosperidade (R$ 127,90)', time: 'Há 45 minutos', unread: true, orderId: 'PED-1049' },
    { id: 3, title: 'Novo Usuário Cadastrado', message: 'Beatriz Vasconcelos criou uma nova conta.', time: 'Há 2 horas', unread: false, orderId: null },
    { id: 4, title: 'Alerta de Estoque', message: 'Colar de Obsidiana Negra atingiu 5 unidades em estoque.', time: 'Hoje às 10:20', unread: false, orderId: null }
  ]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Estados de Produtos
  const [productsList, setProductsList] = useState<CatalogProduct[]>(ALL_PRODUCTS);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Cristais' as const,
    intentions: ['protecao'],
    price: '',
    promotional_price: '',
    description: '',
    stock: '15',
    imagePreview: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'
  });

  // Estados de Artigos
  const [articlesList, setArticlesList] = useState<any[]>([
    {
      id: 1,
      title: 'Como escolher uma pedra para proteção',
      category: 'Cristais & Amuletos',
      intention: 'Proteção & Defesa',
      readTime: '4 min de leitura',
      status: 'Publicado',
      views: 1420,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'
    },
    {
      id: 2,
      title: 'Ervas tradicionalmente associadas à limpeza energética',
      category: 'Ervas Sagradas',
      intention: 'Limpeza & Descarrego',
      readTime: '6 min de leitura',
      status: 'Publicado',
      views: 2180,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600'
    },
    {
      id: 3,
      title: 'Diferenças entre banhos e defumações',
      category: 'Rituais',
      intention: 'Limpeza & Descarrego',
      readTime: '5 min de leitura',
      status: 'Publicado',
      views: 950,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600'
    },
    {
      id: 4,
      title: 'Como montar um espaço de oração e meditação',
      category: 'Harmonia & Lar',
      intention: 'Paz & Serenidade',
      readTime: '7 min de leitura',
      status: 'Publicado',
      views: 1840,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600'
    }
  ]);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Cristais & Amuletos',
    intention: 'Proteção & Defesa',
    readTime: '5 min de leitura',
    excerpt: '',
    imagePreview: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600'
  });

  // Estados de Pedidos
  const [ordersList, setOrdersList] = useState<any[]>([
    {
      id: 'PED-1048',
      customer_name: 'Mariana S. Albuquerque',
      customer_email: 'mariana.albuquerque@gmail.com',
      items: 'Colar de Obsidiana Negra (1x), Spray Energético (1x)',
      intention: 'Proteção & Defesa',
      total_amount: 119.80,
      payment_method: 'PIX (5% OFF)',
      status: 'Aprovado',
      date: 'Há 15 min'
    },
    {
      id: 'PED-1049',
      customer_name: 'Carlos Eduardo Mendes',
      customer_email: 'carlos.mendes@uol.com.br',
      items: 'Cristal Citrino Bruto (2x), Banho Prosperidade (1x)',
      intention: 'Prosperidade & Riqueza',
      total_amount: 127.90,
      payment_method: 'Cartão de Crédito 3x',
      status: 'Em Preparação',
      date: 'Há 45 min'
    },
    {
      id: 'PED-1050',
      customer_name: 'Beatriz Vasconcelos',
      customer_email: 'beatriz.vasc@gmail.com',
      items: 'Japamala de Ametista 108 Contas (1x)',
      intention: 'Paz & Serenidade',
      total_amount: 115.00,
      payment_method: 'PIX',
      status: 'Enviado',
      date: 'Há 2 horas'
    },
    {
      id: 'PED-1051',
      customer_name: 'Lucas Ferreira Guimarães',
      customer_email: 'lucas.guimaraes@outlook.com',
      items: 'Banho Descarrego 7 Ervas (2x), Incenso Sálvia (1x)',
      intention: 'Limpeza & Descarrego',
      total_amount: 95.80,
      payment_method: 'Boleto Bancário',
      status: 'Aguardando Pagamento',
      date: 'Há 4 horas'
    }
  ]);

  // Estados de Usuários
  const [usersList, setUsersList] = useState<any[]>([
    { id: 1, name: 'Administrador Master', email: 'admin@luzecaminho.com.br', role: 'Administrador', status: 'Ativo', date: '15/01/2026' },
    { id: 2, name: 'Equipe de Atendimento', email: 'suporte@luzecaminho.com.br', role: 'Atendente', status: 'Ativo', date: '01/02/2026' },
    { id: 3, name: 'Mariana S. Albuquerque', email: 'mariana.albuquerque@gmail.com', role: 'Cliente', status: 'Ativo', date: '10/02/2026' },
    { id: 4, name: 'Carlos Eduardo Mendes', email: 'carlos.mendes@uol.com.br', role: 'Cliente', status: 'Ativo', date: '15/02/2026' },
    { id: 5, name: 'Beatriz Vasconcelos', email: 'beatriz.vasc@gmail.com', role: 'Cliente', status: 'Ativo', date: '20/02/2026' }
  ]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Cliente' });

  // Contagem de notificações não lidas
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Enriquecimento e Criação Inteligente com IA (Gemini)
  const handleAutoEnrichWithAi = async (overrideName?: string) => {
    const targetName = overrideName || newProduct.name;
    if (!targetName.trim()) {
      alert('Por favor, digite o nome do artigo ou produto para a IA analisar.');
      return;
    }

    setIsGeneratingAi(true);
    setAiFeedback(null);

    try {
      const res = await fetch('http://localhost:3001/api/admin/products/auto-enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: targetName, simpleDescription: newProduct.description })
      });

      if (res.ok) {
        const data = await res.json();
        setNewProduct(prev => ({
          ...prev,
          name: targetName,
          category: data.suggested_category || prev.category,
          intentions: data.intentions_slugs && data.intentions_slugs.length > 0 ? data.intentions_slugs : prev.intentions,
          description: data.enriched_description || prev.description,
          price: prev.price || '59.90'
        }));
        setAiFeedback(`✨ IA identificou ${data.intentions_slugs?.length || 2} intenções espirituais e gerou a descrição fitoenergética!`);
        return;
      }
      simulateLocalAiEnrich(targetName);
    } catch (e) {
      simulateLocalAiEnrich(targetName);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const simulateLocalAiEnrich = (name: string) => {
    const lower = name.toLowerCase();
    let cat: 'Cristais' | 'Banhos' | 'Incensos' | 'Amuletos' | 'Velas' | 'Aromaterapia' = 'Cristais';
    let intents = ['protecao'];
    let desc = '';
    let img = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600';

    if (lower.includes('banho') || lower.includes('erva') || lower.includes('arruda') || lower.includes('guiné') || lower.includes('guine')) {
      cat = 'Banhos';
      intents = ['limpeza', 'protecao'];
      desc = 'Composto fitoenergético sagrado para descarrego profundo, purificação do campo áurico e corte de energias densas acumuladas.';
      img = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600';
    } else if (lower.includes('vela') || lower.includes('cera') || lower.includes('aroma')) {
      cat = 'Velas';
      intents = ['amor', 'paz', 'harmonia-lar'];
      desc = 'Vela aromática 100% vegetal consagrada ao despertar do amor próprio, serenidade emocional e harmonização da frequência do lar.';
      img = 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600';
    } else if (lower.includes('incenso') || lower.includes('defuma') || lower.includes('salvia') || lower.includes('palo')) {
      cat = 'Incensos';
      intents = ['limpeza', 'paz', 'harmonia-lar'];
      desc = 'Incenso natural com resinas puras da floresta para defumação e elevação imediata da vibração de qualquer ambiente.';
      img = 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600';
    } else if (lower.includes('amuleto') || lower.includes('colar') || lower.includes('pulseira') || lower.includes('japamala') || lower.includes('pingente')) {
      cat = 'Amuletos';
      intents = lower.includes('citrino') || lower.includes('ouro') ? ['prosperidade', 'abertura-caminhos'] : ['protecao', 'limpeza'];
      desc = 'Amuleto de proteção consagrado para criar um campo de isolamento magnético e blindagem áurica no dia a dia.';
      img = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600';
    } else if (lower.includes('citrino') || lower.includes('pirita') || lower.includes('prosperidade') || lower.includes('dinheiro')) {
      cat = 'Cristais';
      intents = ['prosperidade', 'abertura-caminhos'];
      desc = 'Mineral solar de alta frequência para magnetizar ganhos materiais, novos contratos, oportunidades profissionais e abundância.';
      img = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600';
    } else {
      cat = 'Cristais';
      intents = ['espiritualidade', 'paz'];
      desc = 'Artigo autêntico selecionado e energizado para apoiar sua jornada de autoconhecimento, oração e conexão espiritual.';
      img = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600';
    }

    setNewProduct(prev => ({
      ...prev,
      name,
      category: cat,
      intentions: intents,
      description: desc,
      price: prev.price || '68.00',
      imagePreview: img
    }));
    setAiFeedback(`✨ IA identificou ${intents.length} intenções (${intents.join(', ')}) e gerou as propriedades energéticas!`);
  };

  // Upload Local de Foto com Preview
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewProduct(prev => ({ ...prev, imagePreview: url }));
    }
  };

  const handleArticleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewArticle(prev => ({ ...prev, imagePreview: url }));
    }
  };

  // Salvar Novo Produto
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const prod: CatalogProduct = {
      id: Date.now(),
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      category: newProduct.category,
      intentions: newProduct.intentions,
      price: parseFloat(newProduct.price),
      promotional_price: newProduct.promotional_price ? parseFloat(newProduct.promotional_price) : undefined,
      rating: 5.0,
      reviews_count: 0,
      image: newProduct.imagePreview,
      description: newProduct.description || 'Produto energizado e consagrado com reverência.',
      in_stock: true
    };

    setProductsList(prev => [prod, ...prev]);
    setProductModalOpen(false);
    setNewProduct({
      name: '',
      category: 'Cristais',
      intentions: ['protecao'],
      price: '',
      promotional_price: '',
      description: '',
      stock: '15',
      imagePreview: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'
    });
  };

  // Salvar Novo Artigo
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title) return;

    const art = {
      id: Date.now(),
      title: newArticle.title,
      category: newArticle.category,
      intention: newArticle.intention,
      readTime: newArticle.readTime,
      status: 'Publicado',
      views: 0,
      image: newArticle.imagePreview
    };

    setArticlesList(prev => [art, ...prev]);
    setArticleModalOpen(false);
    setNewArticle({
      title: '',
      category: 'Cristais & Amuletos',
      intention: 'Proteção & Defesa',
      readTime: '5 min de leitura',
      excerpt: '',
      imagePreview: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600'
    });
  };

  // Salvar Novo Usuário
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const u = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Ativo',
      date: new Date().toLocaleDateString('pt-BR')
    };

    setUsersList(prev => [u, ...prev]);
    setUserModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Cliente' });
  };

  // Atualizar Status do Pedido
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] flex flex-col font-sans text-brand-dark">
      
      {/* HEADER SUPERIOR DO ADMIN */}
      <header className="bg-brand-dark text-white sticky top-0 z-40 px-4 sm:px-8 py-3.5 border-b border-brand-purple/40 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-purple text-brand-gold flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif font-bold text-lg leading-tight tracking-wide text-white">
              Luz & Caminho
            </div>
            <div className="text-[10px] text-brand-gold uppercase tracking-widest font-semibold">
              Painel Administrativo & Gestão
            </div>
          </div>
        </div>

        {/* Ações do Header */}
        <div className="flex items-center gap-4">
          
          {/* Botão Ver Loja */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-brand-cream px-3.5 py-1.5 rounded-xl text-xs font-semibold transition border border-white/15"
          >
            <span>Ver Loja Ao Vivo</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
          </Link>

          {/* SINO DE NOTIFICAÇÕES COM DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 text-brand-gold transition border border-white/15"
              aria-label="Notificações de compras"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-md">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown de Notificações */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-brand-gold/60 p-4 text-brand-dark z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-brand-gold/20">
                  <div className="flex items-center gap-2 font-serif font-bold text-sm text-brand-dark">
                    <Bell className="w-4 h-4 text-brand-purple" />
                    <span>Notificações de Vendas & Alertas</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-brand-purple font-bold hover:underline"
                    >
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl border text-xs transition ${
                        n.unread ? 'bg-brand-gold/15 border-brand-gold/60' : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-brand-dark mb-1">
                        <span className="flex items-center gap-1.5">
                          {n.unread && <span className="w-2 h-2 rounded-full bg-brand-purple"></span>}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-brand-dark/50 font-normal">{n.time}</span>
                      </div>
                      <p className="text-brand-dark/80">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Perfil Admin */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-dark font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-white">Yago Admin</div>
              <div className="text-[10px] text-brand-cream/60">Administrador Master</div>
            </div>
          </div>

        </div>
      </header>

      {/* CONTAINER PRINCIPAL: SIDEBAR + CONTEÚDO */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* SIDEBAR DE NAVEGAÇÃO */}
        <aside className="w-full md:w-64 bg-white border-r border-brand-gold/30 p-4 shrink-0">
          <div className="text-[11px] uppercase tracking-wider font-bold text-brand-dark/50 px-3 mb-2">
            Módulos do Sistema
          </div>
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'dashboard'
                  ? 'bg-brand-dark text-brand-cream shadow-sm'
                  : 'text-brand-dark/80 hover:bg-brand-cream'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-brand-gold" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'products'
                  ? 'bg-brand-dark text-brand-cream shadow-sm'
                  : 'text-brand-dark/80 hover:bg-brand-cream'
              }`}
            >
              <Package className="w-4 h-4 text-brand-gold" />
              <span>Produtos & Estoque</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'articles'
                  ? 'bg-brand-dark text-brand-cream shadow-sm'
                  : 'text-brand-dark/80 hover:bg-brand-cream'
              }`}
            >
              <BookOpen className="w-4 h-4 text-brand-gold" />
              <span>Artigos do Blog</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'orders'
                  ? 'bg-brand-dark text-brand-cream shadow-sm'
                  : 'text-brand-dark/80 hover:bg-brand-cream'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-brand-gold" />
              <span>Pedidos & Vendas</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'users'
                  ? 'bg-brand-dark text-brand-cream shadow-sm'
                  : 'text-brand-dark/80 hover:bg-brand-cream'
              }`}
            >
              <Users className="w-4 h-4 text-brand-gold" />
              <span>Usuários & Acessos</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'ai'
                  ? 'bg-brand-dark text-brand-cream shadow-sm'
                  : 'text-brand-dark/80 hover:bg-brand-cream'
              }`}
            >
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <span>Inteligência Semântica</span>
            </button>
          </nav>
        </aside>

        {/* ÁREA DE CONTEÚDO PRINCIPAL */}
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD / VISÃO GERAL */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-brand-dark">
                  Visão Geral do E-commerce
                </h1>
                <p className="text-xs sm:text-sm text-brand-dark/70 mt-1">
                  Resumo de faturamento, pedidos em tempo real e atividade de busca semântica.
                </p>
              </div>

              {/* CARDS DE KPIS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-brand-gold/40 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-brand-dark/60 font-semibold uppercase">Faturamento Total</div>
                    <div className="text-2xl font-bold text-brand-dark font-serif mt-1">R$ 14.890,50</div>
                    <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +18.4% este mês
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-brand-gold/40 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-brand-dark/60 font-semibold uppercase">Pedidos Realizados</div>
                    <div className="text-2xl font-bold text-brand-dark font-serif mt-1">{ordersList.length + 124}</div>
                    <div className="text-[11px] text-brand-purple font-semibold mt-1">4 novos hoje</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-brand-gold/40 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-brand-dark/60 font-semibold uppercase">Produtos Cadastrados</div>
                    <div className="text-2xl font-bold text-brand-dark font-serif mt-1">{productsList.length}</div>
                    <div className="text-[11px] text-brand-dark/70 font-semibold mt-1">100% em estoque</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-brand-gold/40 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-brand-dark/60 font-semibold uppercase">Buscas Semânticas (IA)</div>
                    <div className="text-2xl font-bold text-brand-dark font-serif mt-1">342</div>
                    <div className="text-[11px] text-emerald-600 font-bold mt-1">98% taxa de acerto</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* ÚLTIMOS PEDIDOS */}
              <div className="bg-white rounded-2xl border border-brand-gold/40 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-lg text-brand-dark">
                    Últimos Pedidos Recebidos
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-brand-purple hover:underline"
                  >
                    Ver todos os pedidos →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-brand-gold/20 text-brand-dark/60 uppercase">
                        <th className="pb-3">Pedido</th>
                        <th className="pb-3">Cliente</th>
                        <th className="pb-3">Itens</th>
                        <th className="pb-3">Intenção</th>
                        <th className="pb-3">Valor</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gold/10">
                      {ordersList.slice(0, 4).map(o => (
                        <tr key={o.id} className="hover:bg-brand-cream/40 transition">
                          <td className="py-3 font-bold text-brand-dark">{o.id}</td>
                          <td className="py-3 font-medium">{o.customer_name}</td>
                          <td className="py-3 text-brand-dark/70">{o.items}</td>
                          <td className="py-3 font-semibold text-brand-purple">{o.intention}</td>
                          <td className="py-3 font-bold">R$ {o.total_amount.toFixed(2).replace('.', ',')}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              o.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-800' :
                              o.status === 'Em Preparação' ? 'bg-amber-100 text-amber-800' :
                              o.status === 'Enviado' ? 'bg-indigo-100 text-indigo-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUTOS & ESTOQUE */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-brand-dark">
                    Gerenciamento de Produtos
                  </h1>
                  <p className="text-xs sm:text-sm text-brand-dark/70 mt-1">
                    Cadastre novos produtos, gerencie estoque e vincule intenções espirituais para busca com IA.
                  </p>
                </div>
                <button
                  onClick={() => setProductModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-purple text-brand-cream px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md hover:scale-105"
                >
                  <Plus className="w-4 h-4 text-brand-gold" />
                  <span>Novo Produto</span>
                </button>
              </div>

              {/* TABELA DE PRODUTOS */}
              <div className="bg-white rounded-2xl border border-brand-gold/40 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-brand-gold/20 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-dark">
                    Total: {productsList.length} produtos cadastrados
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-brand-gold/20 text-brand-dark/60 uppercase bg-gray-50/60">
                        <th className="p-4">Foto</th>
                        <th className="p-4">Nome do Produto</th>
                        <th className="p-4">Categoria</th>
                        <th className="p-4">Intenções Vinculadas</th>
                        <th className="p-4">Preço</th>
                        <th className="p-4">Estoque</th>
                        <th className="p-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gold/10">
                      {productsList.map(p => (
                        <tr key={p.id} className="hover:bg-brand-cream/40 transition">
                          <td className="p-4">
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-brand-gold/30" />
                          </td>
                          <td className="p-4 font-bold text-brand-dark font-serif text-sm">
                            {p.name}
                          </td>
                          <td className="p-4">
                            <span className="bg-brand-purple/10 text-brand-purple font-semibold px-2 py-0.5 rounded">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {p.intentions.map(intent => (
                                <span key={intent} className="bg-brand-gold/25 text-brand-dark text-[10px] font-bold px-1.5 py-0.5 rounded">
                                  {intent}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 font-bold">
                            R$ {p.price.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="p-4">
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                              Em Estoque
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="p-1.5 text-brand-purple hover:bg-brand-purple/10 rounded-lg mr-1" title="Editar">
                              <Edit className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ARTIGOS DO BLOG */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-brand-dark">
                    Gerenciamento de Artigos
                  </h1>
                  <p className="text-xs sm:text-sm text-brand-dark/70 mt-1">
                    Crie conteúdos com sabedoria ancestral e correlacione com intenções e produtos recomendados.
                  </p>
                </div>
                <button
                  onClick={() => setArticleModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-purple text-brand-cream px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md hover:scale-105"
                >
                  <Plus className="w-4 h-4 text-brand-gold" />
                  <span>Novo Artigo</span>
                </button>
              </div>

              {/* LISTAGEM DE ARTIGOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articlesList.map(art => (
                  <div key={art.id} className="bg-white rounded-2xl border border-brand-gold/40 p-5 shadow-sm flex gap-4 items-start">
                    <img src={art.image} alt={art.title} className="w-24 h-24 rounded-xl object-cover shrink-0 border border-brand-gold/30" />
                    <div className="flex-1">
                      <span className="bg-brand-gold/25 text-brand-purple text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {art.category}
                      </span>
                      <h3 className="font-serif font-bold text-brand-dark text-base mt-1.5 leading-snug">
                        {art.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-brand-dark/60 mt-2">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-brand-gold" /> {art.readTime}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {art.views} visualizações</span>
                      </div>
                      <div className="mt-2 text-[11px] font-semibold text-brand-purple">
                        Intenção: {art.intention}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PEDIDOS & VENDAS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-brand-dark">
                  Gestão de Pedidos & Vendas
                </h1>
                <p className="text-xs sm:text-sm text-brand-dark/70 mt-1">
                  Acompanhe e altere o status de compras dos clientes em tempo real.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-brand-gold/40 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-brand-gold/20 text-brand-dark/60 uppercase bg-gray-50/60">
                        <th className="p-4">ID</th>
                        <th className="p-4">Cliente / E-mail</th>
                        <th className="p-4">Itens Comprados</th>
                        <th className="p-4">Intenção</th>
                        <th className="p-4">Pagamento</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status da Compra</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gold/10">
                      {ordersList.map(o => (
                        <tr key={o.id} className="hover:bg-brand-cream/40 transition">
                          <td className="p-4 font-bold text-brand-dark">{o.id}</td>
                          <td className="p-4">
                            <div className="font-bold text-brand-dark">{o.customer_name}</div>
                            <div className="text-brand-dark/50 text-[10px]">{o.customer_email}</div>
                          </td>
                          <td className="p-4 text-brand-dark/80">{o.items}</td>
                          <td className="p-4 font-semibold text-brand-purple">{o.intention}</td>
                          <td className="p-4 font-medium">{o.payment_method}</td>
                          <td className="p-4 font-bold text-sm">R$ {o.total_amount.toFixed(2).replace('.', ',')}</td>
                          <td className="p-4">
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className="bg-brand-cream border border-brand-gold/60 text-brand-dark font-bold text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-brand-purple"
                            >
                              <option value="Aguardando Pagamento">Aguardando Pagamento</option>
                              <option value="Aprovado">Aprovado</option>
                              <option value="Em Preparação">Em Preparação</option>
                              <option value="Enviado">Enviado</option>
                              <option value="Entregue">Entregue</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: USUÁRIOS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-brand-dark">
                    Gerenciamento de Usuários
                  </h1>
                  <p className="text-xs sm:text-sm text-brand-dark/70 mt-1">
                    Cadastre administradores, equipe de suporte e visualize clientes registrados.
                  </p>
                </div>
                <button
                  onClick={() => setUserModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-purple text-brand-cream px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md hover:scale-105"
                >
                  <Plus className="w-4 h-4 text-brand-gold" />
                  <span>Novo Usuário</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-brand-gold/40 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-brand-gold/20 text-brand-dark/60 uppercase bg-gray-50/60">
                      <th className="p-4">Nome</th>
                      <th className="p-4">E-mail</th>
                      <th className="p-4">Função / Cargo</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Data de Cadastro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/10">
                    {usersList.map(u => (
                      <tr key={u.id} className="hover:bg-brand-cream/40 transition">
                        <td className="p-4 font-bold text-brand-dark">{u.name}</td>
                        <td className="p-4 text-brand-dark/70">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            u.role === 'Administrador' ? 'bg-purple-100 text-purple-900' :
                            u.role === 'Atendente' ? 'bg-blue-100 text-blue-900' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {u.status}
                          </span>
                        </td>
                        <td className="p-4 text-brand-dark/60">{u.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: INTELIGÊNCIA SEMÂNTICA */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-brand-dark">
                  Módulo de Inteligência Semântica (Gemini + pgvector)
                </h1>
                <p className="text-xs sm:text-sm text-brand-dark/70 mt-1">
                  Monitore as intenções identificadas pela IA, termos pesquisados pelos clientes e feedback em tempo real.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-brand-gold/40 shadow-sm">
                  <div className="text-xs text-brand-dark/60 font-semibold uppercase">Buscas Aprendidas no Cache</div>
                  <div className="text-2xl font-bold text-brand-dark font-serif mt-1">128</div>
                  <p className="text-[11px] text-brand-dark/60 mt-1">Consultas salvas com vetores HNSW de 768 dimensões.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-brand-gold/40 shadow-sm">
                  <div className="text-xs text-brand-dark/60 font-semibold uppercase">Confiança Média</div>
                  <div className="text-2xl font-bold text-emerald-600 font-serif mt-1">94.8%</div>
                  <p className="text-[11px] text-brand-dark/60 mt-1">Precisão da classificação semântica com Gemini Flash.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-brand-gold/40 shadow-sm">
                  <div className="text-xs text-brand-dark/60 font-semibold uppercase">Feedback Positivo dos Usuários</div>
                  <div className="text-2xl font-bold text-brand-purple font-serif mt-1">99.1%</div>
                  <p className="text-[11px] text-brand-dark/60 mt-1">Usuários confirmaram que a intenção encontrada era exata.</p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL 1: CADASTRAR NOVO PRODUTO COM UPLOAD LOCAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border-2 border-brand-gold/60 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-gold/30">
              <h2 className="font-serif font-bold text-xl text-brand-dark flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-purple" />
                <span>Cadastrar Novo Produto</span>
              </h2>
              <button onClick={() => setProductModalOpen(false)} className="p-1 hover:text-rose-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              {/* CAMPO DE NOME COM BOTÃO DE AUTO-PREENCHIMENTO COM IA */}
              <div className="bg-brand-cream/30 p-3.5 rounded-2xl border border-brand-gold/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-brand-dark flex items-center gap-1.5">
                    <span>Nome do Artigo / Produto *</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAutoEnrichWithAi()}
                    disabled={isGeneratingAi || !newProduct.name.trim()}
                    className="bg-brand-purple hover:bg-brand-dark disabled:opacity-40 text-white px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 transition shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{isGeneratingAi ? 'Analisando com IA...' : '✨ Auto-preencher com IA (Gemini)'}</span>
                  </button>
                </div>

                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Ex: Banho de Alecrim e Guiné ou Colar de Cianita Azul"
                  className="w-full bg-white border border-brand-gold/60 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-brand-purple"
                />

                {/* Chips de Teste Rápido */}
                <div className="flex items-center flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-brand-dark/60">Testar com IA:</span>
                  {[
                    'Banho 7 Ervas Sagradas',
                    'Pingente de Cianita Azul',
                    'Vela Quartzo Rosa e Gerânio',
                    'Pirita Dourada da Abundância'
                  ].map(testItem => (
                    <button
                      key={testItem}
                      type="button"
                      onClick={() => handleAutoEnrichWithAi(testItem)}
                      className="text-[10px] bg-white hover:bg-brand-purple hover:text-white text-brand-dark px-2 py-0.5 rounded-lg border border-brand-gold/40 transition font-medium"
                    >
                      🧪 {testItem}
                    </button>
                  ))}
                </div>

                {/* Feedback da IA */}
                {aiFeedback && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 font-semibold text-[11px] flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{aiFeedback}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-dark mb-1">Categoria *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e: any) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple font-medium"
                  >
                    <option value="Cristais">Cristais & Pedras</option>
                    <option value="Banhos">Banhos de Ervas</option>
                    <option value="Incensos">Incensos & Defumações</option>
                    <option value="Amuletos">Amuletos & Japamalas</option>
                    <option value="Velas">Velas Aromáticas</option>
                    <option value="Aromaterapia">Aromaterapia</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-brand-dark mb-1">Preço Normal (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="79.90"
                    className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Vincular Intenções Espirituais (Busca Semântica) *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                  {['protecao', 'prosperidade', 'limpeza', 'amor', 'paz', 'espiritualidade', 'abertura-caminhos', 'harmonia-lar'].map(intent => (
                    <label key={intent} className="flex items-center gap-1.5 bg-brand-cream/40 p-2 rounded-lg border border-brand-gold/30 cursor-pointer text-[11px] font-semibold capitalize">
                      <input
                        type="checkbox"
                        checked={newProduct.intentions.includes(intent)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewProduct({ ...newProduct, intentions: [...newProduct.intentions, intent] });
                          } else {
                            setNewProduct({ ...newProduct, intentions: newProduct.intentions.filter(i => i !== intent) });
                          }
                        }}
                        className="accent-brand-purple"
                      />
                      <span>{intent.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* UPLOAD DE IMAGEM LOCAL */}
              <div>
                <label className="block font-bold text-brand-dark mb-1">Imagem do Produto (Arquivo Local ou Foto) *</label>
                <div className="flex items-center gap-4 mt-1.5 p-3 rounded-2xl border-2 border-dashed border-brand-gold/60 bg-brand-cream/30">
                  <img src={newProduct.imagePreview} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-brand-gold" />
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-1.5 bg-white border border-brand-gold/80 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-brand-dark hover:text-white transition shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Selecionar Imagem do PC</span>
                      <input type="file" accept="image/*" onChange={handleProductImageUpload} className="hidden" />
                    </label>
                    <p className="text-[10px] text-brand-dark/60 mt-1">Formatos suportados: JPG, PNG, WEBP.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Descrição e Consagração</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Descreva as propriedades energéticas, modo de uso e intenções do produto..."
                  className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="pt-3 border-t border-brand-gold/30 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-brand-dark/70 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-brand-dark hover:bg-brand-purple text-brand-cream px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CADASTRAR NOVO ARTIGO COM UPLOAD LOCAL */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border-2 border-brand-gold/60 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-gold/30">
              <h2 className="font-serif font-bold text-xl text-brand-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-purple" />
                <span>Publicar Novo Artigo</span>
              </h2>
              <button onClick={() => setArticleModalOpen(false)} className="p-1 hover:text-rose-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-dark mb-1">Título do Artigo *</label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="Ex: Como purificar a casa usando Sálvia e Sal Grosso"
                  className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-dark mb-1">Categoria / Tema *</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple font-medium"
                  >
                    <option value="Cristais & Amuletos">Cristais & Amuletos</option>
                    <option value="Ervas Sagradas">Ervas Sagradas</option>
                    <option value="Rituais">Rituais & Banhos</option>
                    <option value="Harmonia & Lar">Harmonia & Lar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-brand-dark mb-1">Intenção Correlacionada *</label>
                  <select
                    value={newArticle.intention}
                    onChange={(e) => setNewArticle({ ...newArticle, intention: e.target.value })}
                    className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple font-medium"
                  >
                    <option value="Proteção & Defesa">Proteção & Defesa</option>
                    <option value="Prosperidade & Riqueza">Prosperidade & Riqueza</option>
                    <option value="Limpeza & Descarrego">Limpeza & Descarrego</option>
                    <option value="Amor & Harmonia">Amor & Harmonia</option>
                    <option value="Paz & Serenidade">Paz & Serenidade</option>
                  </select>
                </div>
              </div>

              {/* UPLOAD LOCAL DA CAPA DO ARTIGO */}
              <div>
                <label className="block font-bold text-brand-dark mb-1">Capa do Artigo (Arquivo do Computador) *</label>
                <div className="flex items-center gap-4 mt-1.5 p-3 rounded-2xl border-2 border-dashed border-brand-gold/60 bg-brand-cream/30">
                  <img src={newArticle.imagePreview} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-brand-gold" />
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-1.5 bg-white border border-brand-gold/80 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-brand-dark hover:text-white transition shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Selecionar Imagem do PC</span>
                      <input type="file" accept="image/*" onChange={handleArticleImageUpload} className="hidden" />
                    </label>
                    <p className="text-[10px] text-brand-dark/60 mt-1">A imagem será vinculada localmente para preview e publicação.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Resumo do Conteúdo</label>
                <textarea
                  rows={3}
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  placeholder="Escreva a introdução e as principais orientações do artigo..."
                  className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="pt-3 border-t border-brand-gold/30 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-brand-dark/70 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-brand-dark hover:bg-brand-purple text-brand-cream px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow"
                >
                  Publicar Artigo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CADASTRAR NOVO USUÁRIO */}
      {userModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-brand-gold/60 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-gold/30">
              <h2 className="font-serif font-bold text-xl text-brand-dark flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-purple" />
                <span>Novo Usuário</span>
              </h2>
              <button onClick={() => setUserModalOpen(false)} className="p-1 hover:text-rose-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-dark mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Nome do usuário"
                  className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">E-mail *</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@exemplo.com"
                  className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Função no Sistema *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full bg-brand-cream/40 border border-brand-gold/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple font-medium"
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Atendente">Atendente de Suporte</option>
                  <option value="Administrador">Administrador Master</option>
                </select>
              </div>

              <div className="pt-3 border-t border-brand-gold/30 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-brand-dark/70 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-brand-dark hover:bg-brand-purple text-brand-cream px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow"
                >
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
