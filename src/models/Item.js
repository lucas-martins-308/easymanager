class Item {
    constructor(data) {
        this.id = data.id;
        this.nome_item = data.nome_item;
        this.quantidade = data.quantidade;
        this.preco = data.preco;
        this.data_validade = data.data_validade;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static validate(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.nome_item || typeof data.nome_item !== 'string') return false;
        if (!data.quantidade || isNaN(data.quantidade)) return false;
        if (!data.preco || isNaN(data.preco)) return false;
        if (!data.data_validade) return false;
        return true;
    }

    toJSON() {
        return {
            id: this.id,
            nome_item: this.nome_item,
            quantidade: this.quantidade,
            preco: this.preco,
            data_validade: this.data_validade,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export default Item; 