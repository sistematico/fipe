<script setup lang="ts">
import { ref, watch } from 'vue'
import icon from '@/components/icon.vue'

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
    <div class="w-full sm:w-5/6 xl:w-1/2 rounded-xl shadow-md m-auto">
      <div class="bg-base-200 rounded shadow p-4">
        <div class="sm:flex sm:items-start">
          <div class="text-center sm:text-left">
            <div class="flex items-center flex-col sm:flex-row sm:mt-2">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-base-100 sm:mx-0 sm:h-10 sm:w-10">
                <icon name="car" />
              </div>
              <h3 class="text-xl md:text-2xl font-bold ml-2">Tabela Fipe</h3>
            </div>

            <ul class="steps mt-3 w-full md:w-4/5">
              <li class="step" :class="{ 'step-primary': tipoAtual != 'Tipo' }">Tipo</li>
              <li class="step" :class="{ 'step-primary': marcaAtual != 'Marca' }">Marca</li>
              <li class="step" :class="{ 'step-primary': modeloAtual != 'Modelo' }">Modelo</li>
              <li class="step" :class="{ 'step-primary': anoAtual != 'Ano' }">Ano</li>
            </ul>

            <div class="grid grid-cols-1 sm:grid-cols-5 mt-6 place-content-between gap-2 md:gap-3">
              <div class="grid content-center">
                <select class="select" v-model="tipoAtual">
                    <option value="Tipo" selected>Selecione</option>
                    <option value="carros" selected>Carros</option>
                    <option value="motos">Motos</option>
                    <option value="caminhoes">Caminhões</option>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectMarca($event)" v-model="marcaAtual" :disabled="tipoAtual == 'Tipo'">
                  <option value="Marca" selected>Selecione</option>
                  <template v-for="{ nome, codigo } in marcas">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectModelo($event)" v-model="modeloAtual" :disabled="marcaAtual == 'Marca'">
                  <option value="Modelo" selected>Selecione</option>
                  <template v-for="{ nome, codigo } in modelos">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center">
                <select class="select" @change="selectAno($event)" v-model="anoAtual" :disabled="modeloAtual == 'Modelo'">
                  <option value="Ano" selected>Selecione</option>
                  <template v-for="{ nome, codigo } in anos">
                    <option :value="codigo">{{ nome }}</option>
                  </template>
                </select>
              </div>

              <div class="grid content-center text-center text-2xl sm:text-xl md:text-md font-bold">
                {{ resultado }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
