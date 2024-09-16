import axios from 'axios';
import { HeroRepository } from "../domain/HeroRepository";
import { Hero } from "../domain/Hero";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export class HeroApiRepository implements HeroRepository {
    private apiKey: string;
    private apiUrl: string;

    constructor() {
        this.apiKey = apiKey;  
        this.apiUrl = apiUrl;  
    }

    getById(id: string): Promise<Hero | null> {
        throw new Error("Method not implemented.");
    }


    async create(hero: Hero): Promise<Hero> {

        try {
            const response = await axios.post(this.apiUrl, hero, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to add hero:', error.response?.data || error.message);
            } else {
                console.error('Failed to add hero:', error);
            }
            throw error;
        }
    }

    async getAll(): Promise<Hero[]> {
        try {
          const response = await axios.get(this.apiUrl, {
            headers: {
              Authorization: this.apiKey,
            },
          });
    
          const heroes = response.data;
    
          if (!heroes || heroes.length === 0) {
            return this.getDefaultHeroes();
          }
    
          return heroes;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Failed to get heroes:', error.response?.data || error.message);
          } else {
            console.error('Failed to get heroes:', error);
          }
    
          return this.getDefaultHeroes();
        }
      }

    async delete(id: string): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/${id}`, {
                headers: {
                    'Authorization': this.apiKey
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to delete hero:', error.response?.data || error.message);
            } else {
                console.error('Failed to delete hero:', error);
            }
            throw error;
        }
    }

    async update(id: string, hero: Hero): Promise<Hero> {
        try {
            const response = await axios.put(`${this.apiUrl}/${id}`, hero, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to update hero:', error.response?.data || error.message);
            } else {
                console.error('Failed to update hero:', error);
            }
            throw error;
        }
    }

    private getDefaultHeroes(): Hero[] {
        return [
                {
                    id: "66e85e319b89a8bca2b72263",
                    name: "All Might",
                    attributes: {
                        agility: 10,
                        strength: 10,
                        weight: 10,
                        endurance: 0,
                        charisma: 10
                    },
                    picture: "/images/heroes/AllMight.webp",
                },
                {
                    id: "66e863009b89a8bca2b7227f",
                    name: "Deku",
                    attributes: {
                        agility: 10,
                        strength: 10,
                        weight: 5,
                        endurance: 8,
                        charisma: 7
                    },
                    picture: "/images/heroes/Deku.webp",

                },
                {
                    id: "66e863c39b89a8bca2b72287",
                    name: "Endeavor",
                    picture: "/images/heroes/Endeavor.webp",
                    attributes: {
                        agility: 7,
                        strength: 8,
                        weight: 8,
                        endurance: 9,
                        charisma: 6
                    },
                },
                {
                    id: "66e877d99b89a8bca2b72355",
                    name: "Shoto",
                    picture: "/images/heroes/Shoto.webp",
                    attributes: {
                        agility: 5,
                        strength: 5,
                        weight: 3,
                        endurance: 9,
                        charisma: 8
                    },
                }
        ];
      }
}
