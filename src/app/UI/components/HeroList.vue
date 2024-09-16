<template>
  <div class="container mx-auto p-8">
   

<div class="grid grid-cols-2 mb-5">
    <h1 class="text-4xl font-bold mb-6 text-center">Superheroes</h1>
    <button @click="openAddModal()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 flex items-center justify-center justify-self-end">
      Añadir Heroe
    </button> 
  </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr class="w-full bg-gray-200 text-left">
            <th class="p-4 border-b text-center">Foto</th>
            <th class="p-4 border-b text-center">Nombre</th>
            <th class="p-4 border-b text-center">Estadisticas</th>
            <th class="p-4 border-b text-center">Editar</th>
            <th class="p-4 border-b text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hero in heroes" :key="hero.id">
            <td class="p-4 border-b">
              <img :src="hero.picture" alt="Hero image" class="hero-picture rounded-full mx-auto">
            </td>
            <td class="p-4 border-b">{{ hero.name }}</td>
            <td class="p-4 border-b">
              <p>Agilidad: {{ hero.attributes?.agility }}</p>
              <p>Fuerza: {{ hero.attributes?.strength }}</p>
              <p>Peso: {{ hero.attributes?.weight }}</p>
              <p>Resistencia: {{ hero.attributes?.endurance }}</p>
              <p>Carisma: {{ hero.attributes.charisma }}</p>
            </td>
            <td class="p-4 border-b">
              <button 
                @click="openEditModal(hero)" 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Editar
              </button>
            </td>
            <td class="p-4 border-b">
              <button 
                @click="deleteHero(hero.id)" 
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddHero 
      v-if="showModal" 
      :hero="selectedHero" 
      :is-edit="isEdit" 
      @close="handleCloseModal"
      @saved="refreshHeroes"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { HeroApiRepository } from '../../infrastructure/heroApiRepository';
import { ManageHeroes } from '../../application/ManageHeroes';
import { Hero } from '../../domain/Hero';
import AddHero from './AddHero.vue';

const heroRepo = new HeroApiRepository();
const manageHeroes = new ManageHeroes(heroRepo);

const heroes = ref<Hero[]>([]);
const showModal = ref(false);
const isEdit = ref(false);
const selectedHero = ref<Hero>();

onMounted(async () => {
  await refreshHeroes();
});

const refreshHeroes = async () => {
  heroes.value = await manageHeroes.listHeroes();
};
const openAddModal = () => {
  isEdit.value = false;
  showModal.value = true;
}
const openEditModal = (hero: Hero) => {
  selectedHero.value = { ...hero }; 
  isEdit.value = true;
  showModal.value = true;
};

const handleCloseModal = () => {
  showModal.value = false;
  isEdit.value = false;
};

const deleteHero = async (id: string) => {
  await manageHeroes.deleteHero(id);
  await refreshHeroes();
};
</script>

<style>

</style>
