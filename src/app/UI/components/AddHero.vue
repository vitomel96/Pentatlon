<template>
  <div>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-4">{{ isEdit ? 'Edit Hero' : 'Add New Hero' }}</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input v-model="hero.name" type="text" id="name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required />
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Imagen</label>
            <input type="file" @change="handleImageUpload"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div class="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label for="agility" class="block text-sm font-medium text-gray-700">Agilidad</label>
              <input v-model.number="hero.attributes.agility" @input="checkMaxValues" type="number" id="agility" min="0"
                max="10"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required />
            </div>
            <div>
              <label for="strength" class="block text-sm font-medium text-gray-700">Fuerza</label>
              <input v-model.number="hero.attributes.strength" @input="checkMaxValues" type="number" id="strength"
                min="0" max="10"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required />
            </div>
            <div>
              <label for="weight" class="block text-sm font-medium text-gray-700">Peso</label>
              <label for="weight" class="block text-sm font-medium text-gray-700">Peso</label>
              <input v-model.number="hero.attributes.weight" @input="checkMaxValues" type="number" id="weight" min="0"
                max="10"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required />
            </div>
            <div>
              <label for="endurance" class="block text-sm font-medium text-gray-700">Resistencia</label>
              <input v-model.number="hero.attributes.endurance" @input="checkMaxValues" type="number" id="endurance"
                min="0" max="10"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required />
            </div>
            <div>
              <label for="charisma" class="block text-sm font-medium text-gray-700">Carisma</label>
              <input v-model.number="hero.attributes.charisma" @input="checkMaxValues" type="number" id="charisma"
                min="0" max="10"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required />
            </div>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="$emit('close')"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {{ isEdit ? 'Guardar Cambios' : 'Crear' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Hero } from '../../domain/Hero';
import { ManageHeroes } from '../../application/ManageHeroes';
import { HeroApiRepository } from '../../infrastructure/heroApiRepository';

const props = defineProps({
  hero: {
    type: Object as () => Hero,
    default: () => ({
      id: '',
      name: '',
      picture: '',
      attributes: {
        agility: 0,
        strength: 0,
        weight: 0,
        endurance: 0,
        charisma: 0
      }
    })
  },

  isEdit: {
    type: Boolean,
    default: false
  }
});

const checkMaxValues = () => {
  const maxLimit = 10;
  const attributes = hero.value.attributes;

  if (attributes.agility > maxLimit) attributes.agility = maxLimit;
  if (attributes.strength > maxLimit) attributes.strength = maxLimit;
  if (attributes.weight > maxLimit) attributes.weight = maxLimit;
  if (attributes.endurance > maxLimit) attributes.endurance = maxLimit;
  if (attributes.charisma > maxLimit) attributes.charisma = maxLimit;
};

const emit = defineEmits(['close', 'saved']);

const showModal = ref(true);
const hero = ref<Hero>(props.hero);

watch(() => props.hero, (newHero) => {
  hero.value = { ...newHero };
});

const handleSubmit = async () => {
  const manageHeroes = new ManageHeroes(new HeroApiRepository());
  if (props.isEdit) {
    await manageHeroes.editHero(hero.value.id, hero.value);
  } else {
    await manageHeroes.createHero(hero.value);
  }
  emit('saved');
  emit('close');
};

const handleImageUpload = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      hero.value.picture = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped></style>
