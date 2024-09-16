import { Hero } from "../domain/Hero";
import { HeroRepository } from "../domain/HeroRepository";

export class ManageHeroes {
    constructor(private heroRepo: HeroRepository) { }

    async createHero(hero: Hero) {
        Hero.validate(hero);
        return await this.heroRepo.create(hero);
    }

    async listHeroes() {
        const data = await this.heroRepo.getAll()
        return data;
    }

    async deleteHero(id: string) {
        return await this.heroRepo.delete(id);
    }


    async findHero(id: string) {
        return await this.heroRepo.getById(id);
    }
    async editHero(id: string, heroData: any) {
        const { id: heroId, name, picture, attributes } = heroData;
    
        const attributesPlain = { ...attributes };
    
        const updatedHero = new Hero(
            heroId, 
            name, 
            picture, 
            attributesPlain
        );
    
        Hero.validate(updatedHero);
        return await this.heroRepo.update(id, updatedHero);
    }
    
}
