<template>
     <div>
      <h3 class="text-xl font-semibold mb-4">Selecciona 3 Superhéroes</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="hero in heroes" :key="hero.id" class="p-4 border rounded-lg">
          <h3 class="text-xl font-semibold">{{ hero.name }}</h3>
          <img :src="hero.picture" alt="Hero image" class="hero-picture rounded-full mx-auto">
          <button 
            @click="selectHero(hero)" 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            :disabled="selectedHeroes.includes(hero)">
            {{ selectedHeroes.includes(hero) ? 'Seleccionado' : 'Seleccionar' }}
          </button>
        </div>
      </div>
      <button 
        @click="startSimulation"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        :disabled="selectedHeroes.length !== 3">
        Iniciar Simulación
      </button>
    </div>
  <div>
    <h2 class="text-2xl font-bold mb-4">Resultados de la Simulación</h2>
    
    <!-- Tabla de Resultados -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Clasificación Final</h3>
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr class="w-full bg-gray-200 text-left">
            <th class="p-4 border-b text-center">Medalla</th>
            <th class="p-4 border-b text-center">Nombre del Héroe</th>
            <th class="p-4 border-b text-center">Foto</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="result.hero.id">
            <td class="p-4 border-b" >
              <div :class="['medal', medalClass(index)]">
                <span>{{ result.points }}</span>
              </div>
            </td>
            <td class="p-4 border-b">{{ result.hero.name }}</td>
            <td class="p-4 border-b">
              <div class="flex justify-center">
                <img :src="result.hero.picture" alt="Hero image" class="hero-picture rounded-full">

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

 
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Hero } from '../../domain/Hero';
import { ManageHeroes } from '../../application/ManageHeroes';
import { HeroApiRepository } from '../../infrastructure/heroApiRepository';

const results = ref<{ hero: Hero; points: number }[] | null>(null);
const heroRepo = new HeroApiRepository();
const manageHeroes = new ManageHeroes(heroRepo);
const heroes = ref<Hero[]>([]);
const selectedHeroes = ref<Hero[]>([]);

onMounted(async () => {
  await refreshHeroes();
});

const refreshHeroes = async () => {
  heroes.value = await manageHeroes.listHeroes();
};

const selectHero = (hero: Hero) => {
  if (selectedHeroes.value.includes(hero)) {
    selectedHeroes.value = selectedHeroes.value.filter(h => h.id !== hero.id);
  } else {
    if (selectedHeroes.value.length < 3) {
      selectedHeroes.value.push(hero);
    }
  }
};
const medalClass = (index: number) => {
  if (index === 0) return 'gold';
  if (index === 1) return 'silver';
  if (index === 2) return 'bronze';
  return '';
};
const startSimulation = () => {
  if (selectedHeroes.value.length !== 3) {
    console.error('Selecciona exactamente 3 superhéroes.');
    return;
  } else {
    // Prueba 1: Trepar rascacielos
    const climbingResults = selectedHeroes.value.map(hero => ({
      hero,
      value: (hero.attributes.strength * 4) - (hero.attributes.weight * 2),
    }));

    // Prueba 2: Contar chiste
    const charismaSum = selectedHeroes.value.reduce((sum, hero) => sum + hero.attributes.charisma, 0);
    const jokeResults = selectedHeroes.value.map(hero => ({
      hero,
      value: Math.pow(hero.attributes.charisma, 2) - charismaSum,
    }));

    // Prueba 3: Tiro al villano
    const tiroResults = selectedHeroes.value.map(hero => ({
      hero,
      value: (hero.attributes.agility + hero.attributes.strength),
    }));

    // Prueba 4: 200km lisos
    const sortedTiroResults = [...tiroResults].sort((a, b) => b.value - a.value);
    const firstInPrevious = sortedTiroResults[0]?.hero.id;
    const lisosResults = selectedHeroes.value.map(hero => ({
      hero,
      value: (hero.attributes.agility * 4) + (hero.attributes.endurance * 2) + (hero.id === firstInPrevious ? 10 : -1),
    }));

    // Prueba 5: Rescate de cien gatitos
    const wins = [climbingResults, jokeResults, tiroResults, lisosResults].map(results =>
      results.sort((a, b) => b.value - a.value).map(result => result.hero.id)
    );
    const winCounts = new Map();
    for (const ids of wins) {
      ids.forEach(id => winCounts.set(id, (winCounts.get(id) || 0) + 1));
    }
    const rescueResults = selectedHeroes.value.map(hero => ({
      hero,
      value: (hero.attributes.agility * 2) + (winCounts.get(hero.id) >= 2 ? 5 : 0),
    }));

    // Combinar resultados
    const allResults = [climbingResults, jokeResults, tiroResults, lisosResults, rescueResults];

    // Calcular puntos finales
    const heroPoints = selectedHeroes.value.map(hero => {
      const totalPoints = allResults.reduce((sum, results) => {
        const result = results.find(r => r.hero.id === hero.id);
        return sum + (result ? result.value : 0);
      }, 0);

      return { hero, points: totalPoints };
    });

    // Sortear heroes por puntuación
    const sortedResults = heroPoints.sort((a, b) => b.points - a.points);

    // Asignar posición
    const finalResults  =sortedResults.map((result, index) => {
      let points = 0;
      if (index === 0) points = 5;   // Oro
      else if (index === 1) points = 3;  // Plata
      else if (index === 2) points = 1;  // Bronce

      return { ...result, points };
    });
    results.value = finalResults;
  }
};
</script>

<style scoped>
.medal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  font-weight: bold;
  position: relative;
}

.medal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 10px solid;
}

.medal.gold {
  background-color: gold;
}

.medal.silver {
  background-color: silver;
}

.medal.bronze {
  background-color: #cd7f32;
}

.medal span {
  position: relative;
}
</style>
