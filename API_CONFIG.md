# Configuração da API - EasyManager

## Configuração da URL da API

O sistema EasyManager usa a variável de ambiente `VITE_API_URL` para configurar a URL do backend.

### Como Configurar

1. **Criar arquivo `.env.local`** na raiz do projeto:
```bash
VITE_API_URL=http://localhost:3001
```

2. **Ou definir a variável de ambiente** no sistema:
```bash
# Windows (PowerShell)
$env:VITE_API_URL="http://localhost:3001"

# Linux/Mac
export VITE_API_URL="http://localhost:3001"
```

### Estrutura Atual

O sistema já está configurado para usar a variável de ambiente em todos os lugares:

- ✅ **constants.js**: `export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'`
- ✅ **Todos os serviços** importam e usam a constante `API_URL`
- ✅ **Todos os componentes** que fazem requisições usam a constante `API_URL`

### Serviços que usam a API_URL

- `authService.js` - Autenticação
- `customerService.js` - Gestão de hóspedes
- `itemService.js` - Gestão de itens
- `reservationService.js` - Gestão de reservas
- `roomService.js` - Gestão de quartos
- `userService.js` - Gestão de usuários

### URLs das APIs

Todas as URLs seguem o padrão: `${API_URL}/api/[recurso]`

- `/api/auth/login` - Login
- `/api/hospedes` - Hóspedes
- `/api/itens` - Itens
- `/api/reservas` - Reservas
- `/api/quartos` - Quartos
- `/api/usuarios` - Usuários

### Fallback

Se a variável `VITE_API_URL` não estiver definida, o sistema usa `http://localhost:3001` como padrão. 