export class Pangolin {
    id: number;
    token: string;
    name: string;
    email: string;
    password: string;
    hp: number;
    roles: string[];
    types: string[];
    friends: {}[];

    constructor(
        name: string = "Entrer un nom ...",
        email: string = "xxxx@xxxx.xx",
        password: string = "Mot de passe",
        hp: number = 777,
        roles: string[] = ["Guerrier"],
        types: string[] = ["Le Classique"],
        friends: [] = [],
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.hp = hp;
        this.roles = roles;
        this.types = types;
        this.friends = friends;
    }
}