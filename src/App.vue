<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const tipos = ['carros', 'motos', 'caminhoes']
const tipoAtual = ref(tipos[0])
const marcas = ref<any[]>([])

const modelos = ref([])

const selectMarca = async (event: Event) => {
  const marca = (event.target as HTMLSelectElement).value
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas/${marca}/modelos`
//   modelos.value = await (await fetch(url)).json()
  modelos.value = await (await fetch(url)).json().then( data => data.modelos )
//   console.log((event.target as HTMLSelectElement).value)
  console.log(modelos.value)
}

const selectModelo = async (event: Event) => {
  const marca = (event.target as HTMLSelectElement).value
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas/${marca}/modelos`
  modelos.value = await (await fetch(url)).json().then( data => data.modelos )
//   console.log((event.target as HTMLSelectElement).value)
}

watchEffect(async () => {
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas`
  marcas.value = await (await fetch(url)).json()
})
</script>
<template>
  <h1>Tabela Fipe</h1>

  <template v-for="tipo in tipos">
    <input type="radio" :id="tipo" :value="tipo" name="tipo" v-model="tipoAtual" />
    <label :for="tipo">{{ tipo }}</label>
  </template>

  <select @change="selectMarca($event)">
    <template v-for="{ nome, codigo } in marcas">
      <option :value="codigo">{{ nome }}</option>
    </template>
  </select>

  <select @change="selectModelo($event)" v-if="marcas">
    <template v-for="{ nome, codigo } in modelos">
      <option :value="codigo">{{ nome }}</option>
    </template>
  </select>
</template>
