# Status "Pendente" - Explicação

## Como o Status "Pendente" Funciona

### **Definição no Banco de Dados**

O status "pendente" está definido no modelo `Reserva` como um ENUM com três opções possíveis:

```javascript
// easymanager-be/models/Reserva.js
statusReserva: {
    type: DataTypes.ENUM('confirmada', 'cancelada', 'pendente'),
    allowNull: false,
    field: 'statusReserva'
}
```

### **Significado dos Status**

1. **`confirmada`** - Reserva confirmada e garantida
2. **`pendente`** - Reserva aguardando confirmação
3. **`cancelada`** - Reserva cancelada

### **Como é Aplicado**

#### **1. Criação de Nova Reserva**
Quando uma nova reserva é criada através do formulário, ela é automaticamente definida como "pendente":

```javascript
// easymanager/src/components/forms/ReservationForm/ReservationForm.jsx
const reservationData = {
    dtCheckin: formData.checkIn,
    dtCheckout: formData.checkOut,
    valorReserva: valorTotal,
    canalReserva: formData.canal,
    statusReserva: 'pendente', // ← Status inicial
    hospedeId: selectedCustomer.idHospede
};
```

#### **2. Visualização no Calendário**
No calendário, cada status tem uma cor diferente:

```javascript
// easymanager/src/components/calendars/ReservationCalendar/ReservationCalendar.jsx
const getStatusColor = (status) => {
    switch (status) {
        case 'confirmada':
            return '#76c893'; // Verde
        case 'pendente':
            return '#ffd93d'; // Amarelo
        case 'cancelada':
            return '#ff6b6b'; // Vermelho
        default:
            return '#76c893';
    }
};
```

### **Fluxo de Status**

```
Nova Reserva → pendente → confirmada/cancelada
```

1. **Reserva Criada**: Status inicial é sempre "pendente"
2. **Confirmação**: Pode ser alterada para "confirmada" 
3. **Cancelamento**: Pode ser alterada para "cancelada"

### **Dados de Exemplo**

No arquivo `create_database.sql`, temos reservas com diferentes status:

```sql
INSERT INTO Reserva (dtCheckin, dtCheckout, valorReserva, canalReserva, statusReserva, hospedeId) VALUES
('2024-12-01', '2024-12-05', 480.00, 'Website', 'confirmada', 1),    -- Verde
('2024-12-03', '2024-12-07', 800.00, 'Agência', 'pendente', 2),      -- Amarelo
('2024-12-05', '2024-12-10', 1400.00, 'Telefone', 'confirmada', 3),  -- Verde
('2024-12-08', '2024-12-12', 480.00, 'Website', 'pendente', 1),      -- Amarelo
('2024-12-10', '2024-12-15', 1000.00, 'Agência', 'confirmada', 2);   -- Verde
```

### **Funcionalidades Relacionadas**

#### **Check-in/Check-out**
Os métodos de check-in e check-out alteram o status para "confirmada":

```javascript
// easymanager-be/controllers/ReservaController.js
async checkin(req, res) {
    const [updated] = await Reserva.update(
        { statusReserva: 'confirmada' }, // ← Confirma a reserva
        { where: { idReserva: req.params.id } }
    );
}
```

#### **Cancelamento**
O método de cancelamento altera o status para "cancelada":

```javascript
async cancelar(req, res) {
    const [updated] = await Reserva.update(
        { statusReserva: 'cancelada' }, // ← Cancela a reserva
        { where: { idReserva: req.params.id } }
    );
}
```

### **Interface do Usuário**

No calendário, você verá:
- **Reservas Verdes**: Confirmadas (garantidas)
- **Reservas Amarelas**: Pendentes (aguardando confirmação)
- **Reservas Vermelhas**: Canceladas

### **Próximos Passos Sugeridos**

Para melhorar o sistema de status, seria interessante implementar:

1. **Botões de Ação**: Confirmar/Cancelar reservas diretamente no calendário
2. **Notificações**: Alertas para reservas pendentes
3. **Filtros**: Filtrar por status no calendário
4. **Relatórios**: Estatísticas por status
5. **Automação**: Confirmação automática após pagamento 