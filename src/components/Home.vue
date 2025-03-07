<template>
	<div class="grid middle-align center-align">
		<div class="l3 space m l"></div>
		<div class="s12 m5 l3">
			<img class="circle responsive secondary-container" src="/profile.png" style="max-width: 100%; height: auto;">
		</div>
		<div class="s12 m5 l4" :class="{ 'left-align': greaterSm, 'center-align': !greaterSm }">
			<h2 class="primary-text">Igor Fernando</h2>
			<!-- <h5 class="secondary-text">Full Stack Developer</h5> -->
			<h6 class="secondary-text">
				<span v-for="(char, index) in text" :key="index" ref="chars" :class="{ 'tiny-padding padding-right': charIsSpace(char) }">{{ char }}</span>
			</h6>
			<!-- <div class="space"></div>
			<button class="secondary medium-elevate no-margin">
				<i>arrow_downward</i>
				<span>Conheça meu trabalho</span>
			</button> -->
		</div>
	</div>
</template>

<script setup>
import { useBreakpoints } from '../composables/useBreakpoints'
import { onMounted, ref } from 'vue'
import { animate } from 'motion'

const { greaterSm } = useBreakpoints()

// Dividir o texto em caracteres, incluindo espaços
const text = "Materializando ideias".split('')
const chars = ref([])

const charIsSpace = (char) => {
	return char === ' '
}

onMounted(() => {
	const globalDelay = 1; // Atraso global em segundos

	setTimeout(() => {
		chars.value.forEach((char, index) => {
			animate(char, { 
				opacity: [0, 1], 
				transform: ['translateY(-20px)', 'translateY(0)'] 
			}, { 
				delay: index * 0.1, // Delay para cada letra
				duration: 0.5,
				easing: 'ease-out'
			})
		})
	}, globalDelay * 1000) // Converter segundos para milissegundos
})
</script>

<style scoped>
.secondary-text span {
	display: inline-block;
	opacity: 0; /* Inicialmente invisível */
	transform: translateY(20px); /* Inicialmente deslocado para baixo */
}
</style>
