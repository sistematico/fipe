<script setup lang="ts">
import { ref, watch } from 'vue'

const marcas = ref<any[]>([])
const modelos = ref<any[]>([])
const anos = ref<any[]>([])

const tipoAtual = ref('Tipo')
const marcaAtual = ref('Marca')
const modeloAtual = ref('Modelo')
const anoAtual = ref('Ano')

const resultado = ref('')

const selectMarca = async (event: Event) => {
  modeloAtual.value = 'Modelo'
  anoAtual.value = 'Ano'
  const marca = (event.target as HTMLSelectElement).value
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas/${marca}/modelos`
  modelos.value = await (await fetch(url)).json().then((data) => data.modelos)
}

const selectModelo = async (event: Event) => {
  anoAtual.value = 'Ano'
  const modelo = (event.target as HTMLSelectElement).value
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas/${marcaAtual.value}/modelos/${modelo}/anos`
  anos.value = await (await fetch(url)).json().then(data => data)
}

const selectAno = async (event: Event) => {
  const ano = (event.target as HTMLSelectElement).value || false
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas/${marcaAtual.value}/modelos/${modeloAtual.value}/anos/${ano}`
  resultado.value = await (await fetch(url)).json().then((data) => data.Valor)
}

watch(tipoAtual, async () => {
  marcaAtual.value = 'Marca'
  modeloAtual.value = 'Modelo'
  anoAtual.value = 'Ano'

  if (tipoAtual && tipoAtual.value != 'Tipo') {
    try {
      marcas.value = await (await fetch(`https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas`)).json()
    } catch (error) {
      resultado.value = 'Erro ao acessar a API: ' + error
    }
  }
})
</script>
<template>
  <main role="main" class="w-full flex flex-col h-screen content-center justify-center">
    <div class="w-full sm:w-1/2 lg:w-5/8 rounded-xl shadow-md m-auto">
      <div class="bg-base-200 rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-base-200 sm:mx-0 sm:h-10 sm:w-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div class="mt-3 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium mt-2" id="modal-title">Tabela Fipe</h3>

            <ul class="steps mt-2 w-4/5">
              <li class="step" :class="{ 'step-primary': tipoAtual != 'Tipo' }">Tipo</li>
              <li class="step" :class="{ 'step-primary': marcaAtual != 'Marca' }">Marca</li>
              <li class="step" :class="{ 'step-primary': modeloAtual != 'Modelo' }">Modelo</li>
              <li class="step" :class="{ 'step-primary': anoAtual != 'Ano' }">Ano</li>
            </ul>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-3 mt-6 content-center">
              <div class="grid content-center">
                <select class="select border-transparent focus:border-transparent focus:ring-0" v-model="tipoAtual">
                    <option value="Tipo" selected>Selecione</option>
                    <option value="carros" selected>Carros</option>
                    <option value="motos">Motos</option>
                    <option value="caminhoes">Caminhões</option>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectMarca($event)" v-model="marcaAtual">
                  <option value="Marca" selected>Selecione</option>
                  <template v-for="{ nome, codigo } in marcas">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectModelo($event)" v-model="modeloAtual">
                  <option value="Modelo" selected>Selecione</option>
                  <template v-for="{ nome, codigo } in modelos">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectAno($event)" v-model="anoAtual">
                  <option value="Ano" selected>Selecione</option>
                  <template v-for="{ nome, codigo } in anos">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center text-center text-2xl font-bold">
                {{ resultado }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
