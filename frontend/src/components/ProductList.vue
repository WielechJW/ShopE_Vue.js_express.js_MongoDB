<template>
  <div>
    <div class="w-full text-center p-10">
      <h1 class="text-red-700 text-3xl font-bold">Sklep TODO</h1>
    </div>
    <div class="p-4 text-center">
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="product in products" :key="product._id" class="border border-gray-300 rounded-lg p-4 shadow-lg">
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-700 mb-4">{{ product.description }}</p>
          <p class="text-lg font-bold text-blue-500">{{ product.cena }} PLN</p>
          <button @click="downloadProduct(product)" class="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg">
            Pobierz
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { apiUrl } from '../config';

export default {
  data() {
    return {
      products: []
    };
  },
  mounted() {
    axios.get(`${apiUrl}/products`)
      .then(response => {
        this.products = response.data;
      });
  },
  methods: {
    downloadProduct(product) {
      const productData = JSON.stringify(product, null, 2);
      const blob = new Blob([productData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product.name}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
};
</script>

<style>
/* Dodaj niestandardowe style tutaj, jeśli potrzebujesz */
</style>
