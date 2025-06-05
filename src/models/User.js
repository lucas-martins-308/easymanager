import { ROLES } from '../config/constants';

class User {
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.email = data.email;
        this.role = data.role;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static validate(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.role || !Object.values(ROLES).includes(data.role)) return false;
        if (!data.email || typeof data.email !== 'string') return false;
        return true;
    }

    isAdmin() {
        return this.role === ROLES.ADMIN;
    }

    isFuncionario() {
        return this.role === ROLES.FUNCIONARIO;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export default User; 