export class Hero {
    public attributes: {
        agility: number,
        strength: number,
        weight: number,
        endurance: number,
        charisma: number
    };

    constructor(
        public id: string,
        public name: string,
        public picture: string, // Base64 string
        attributes: {
            agility: number,
            strength: number,
            weight: number,
            endurance: number,
            charisma: number
        }
    ) {
        this.attributes = attributes; // Inicializa la propiedad attributes
    }

    static validate(hero: Hero) {
        if (!hero.attributes) {
            throw new Error('Attributes are missing.');
        }

        const attributes = [
            hero.attributes.agility, 
            hero.attributes.strength, 
            hero.attributes.weight, 
            hero.attributes.endurance, 
            hero.attributes.charisma
        ];

        attributes.forEach(attr => {
            if (attr < 0 || attr > 10) {
                throw new Error('Los atributos deben estar entre 0 y 10');
            }
        });
    }
}
