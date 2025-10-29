# Configuração do Backend no Render.com

## Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no painel do Render:

### Database (Supabase)
```
DB_HOST=aws-1-sa-east-1.pooler.supabase.com
DB_PORT=6543
DB_USERNAME=postgres.gqjrklyroglcipzzpxus
DB_PASSWORD=160812
DB_DATABASE=postgres
```

### Application
```
PORT=3000
NODE_ENV=production
```

### CORS
```
FRONTEND_URL=https://seu-frontend-url.vercel.app
```

### JWT
```
JWT_SECRET=sua-chave-jwt-super-secreta-aqui
```

### Supabase
```
SUPABASE_URL=https://gqjrklyroglcipzzpxus.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxanJrbHlyb2dsY2lwenpweHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTMwMjcsImV4cCI6MjA3NTE2OTAyN30.L1VD4bj7iTt_3kwZSBrMOVtqNGKt8WxlZE3jcPP-tlo
```

## Configurações de Build

### Build Command
```
npm install && npm run build
```

### Start Command
```
npm run start:prod
```

## Health Check

Após o deploy, você pode verificar a saúde da aplicação:

- **Health geral**: `GET /health`
- **Health do banco**: `GET /health/database`

## Troubleshooting

### Problemas de Conexão com Banco

1. **Verifique as variáveis de ambiente** - Certifique-se de que todas estão configuradas corretamente
2. **Porta correta** - Use porta 6543 para o Connection Pooler do Supabase
3. **SSL** - A configuração SSL está habilitada automaticamente
4. **Pool de conexões** - Configurado para máximo 5 conexões simultâneas

### Logs Úteis

- Verifique os logs do Render para mensagens de debug da configuração do banco
- O sistema agora inclui retry automático (10 tentativas com 3s de intervalo)
- Timeouts otimizados para ambiente de produção

## Melhorias Implementadas

1. **Pool de conexões otimizado** para Supabase Connection Pooler
2. **Retry automático** em caso de falha de conexão
3. **Timeouts ajustados** para ambiente de produção
4. **Health checks** para monitoramento
5. **Configurações específicas** para o Render.com