<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue'

const marcas = ref<any[]>([])
const modelos = ref<any[]>([])
const anos = ref<any[]>([])

const tipoAtual = ref([])
const marcaAtual = ref([])
const modeloAtual = ref([])
const anoAtual = ref([])

const resultado = ref('')

const selectMarca = async (event: Event) => {
  const marca = (event.target as HTMLSelectElement).value
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas/${marca}/modelos`
  modelos.value = await (await fetch(url)).json().then((data) => data.modelos)
}

const selectModelo = async (event: Event) => {
  const modelo = (event.target as HTMLSelectElement).value
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas/${marcaAtual.value}/modelos/${modelo}/anos`
  anos.value = await (await fetch(url)).json().then(data => data)
}

const selectAno = async (event: Event) => {
  const ano = (event.target as HTMLSelectElement).value
  const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas/${marcaAtual.value}/modelos/${modeloAtual.value}/anos/${ano}`
  resultado.value = await (await fetch(url)).json().then((data) => data.Valor)
}

// watchEffect(async () => {
//   console.log(tipoAtual.value)

//   const url = `https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas`
//   marcas.value = await (await fetch(url)).json()
// })

watch(tipoAtual, async () => {
  if (tipoAtual) {
    resultado.value = 'Pesquisando...'
    try {
      marcas.value = await (await fetch(`https://parallelum.com.br/fipe/api/v1/${tipoAtual.value}/marcas`)).json()
      resultado.value = 'Selecione a marca'
    } catch (error) {
      resultado.value = 'Erro ao acessar a API: ' + error
    }
  }
})
</script>
<template>
  <main role="main" class="w-full flex flex-col h-screen content-center justify-center">
    <div class="w-full sm:w-1/2 lg:w-1/3 rounded-xl shadow-md m-auto">
      <div class="bg-base-300 rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-base-200 sm:mx-0 sm:h-10 sm:w-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium" id="modal-title">Tabela Fipe</h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mt-6 content-center">
              <!-- <div class="mt-2 space-y-6 text-center"> -->
              <div class="grid content-center">
                <!-- <label class="label cursor-pointer" v-for="tipo in tipos">
                  <input type="radio" :id="tipo" :value="tipo" name="tipo" class="radio checked:bg-red-500" v-model="tipoAtual" />
                  <span class="label-text">{{ tipo }}</span>
                </label> -->

                <select class="select border-transparent focus:border-transparent focus:ring-0" v-model="tipoAtual">
                    <option value="carros" selected>Carros</option>
                    <option value="motos">Motos</option>
                    <option value="caminhoes">Caminhões</option>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectMarca($event)" v-if="tipoAtual" v-model="marcaAtual">
                  <template v-for="{ nome, codigo } in marcas">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectModelo($event)" v-if="marcaAtual" v-model="modeloAtual">
                  <template v-for="{ nome, codigo } in modelos">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectAno($event)" v-if="modeloAtual" v-model="anoAtual">
                  <template v-for="{ nome, codigo } in anos">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center align-middle text-2xl">
                {{ resultado }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
