import { Hero } from './Hero';

export interface HeroRepository {
  create(hero: Hero): Promise<Hero>;
  getById(id: string): Promise<Hero | null>;
  update(id: string, hero: Hero): Promise<Hero>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Hero[]>;
}