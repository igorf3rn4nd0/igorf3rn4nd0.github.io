<template>
	<section class="section">
		<div class="grid middle-align center-align">
			<div class="l3 space l"></div>
			<div class="s12 m5 l3">
				<img
					class="circle responsive secondary-container elevate cursor-pointer"
					src="/profile.png"
					style="max-width: 100%; height: auto;"
					@click="setRandomThemeColor"
				>
			</div>
			<div class="s12 m5 l4" :class="{ 'left-align': greaterSm, 'center-align': !greaterSm }">
				<h2 class="secondary-text">
					Igor Fernando
				</h2>
				<h6 class="secondary-text" style="top: -1.2rem;">
					<span v-for="(char, index) in text" :key="index" ref="chars" :class="{ 'tiny-padding padding-right': charIsSpace(char) }">{{ char }}</span>
				</h6>
				<!-- <div class="space"></div> -->
				<router-link class="button elevate no-margin ripple" to="/about">
					<i>keyboard_arrow_down</i>
					<span>Conheça meu trabalho</span>
				</router-link>
			</div>
		</div>
		<div class="padding absolute top front right" style="top: -20px;" ref="lampContainer">
			<IncandescentLamp v-model="currentMode" />
		</div>
	</section>
</template>

<script setup>
import { useBreakpoints } from '../composables/useBreakpoints'
import { onMounted, ref } from 'vue'
import { animate } from 'motion'
import { setRandomThemeColor } from '../utils/themeUtils'
import IncandescentLamp from '../components/IncandescentLamp.vue'
const { greaterSm } = useBreakpoints()

// Dividir o texto em caracteres, incluindo espaços
const text = "Materializando ideias".split('')
const chars = ref([])
const currentMode = ref(ui('mode'))
const lampContainer = ref(null)

const charIsSpace = (char) => {
	return char === ' '
}

onMounted(() => {
	const globalDelay = 0.5; // Atraso global em segundos
	const lampDelay = 1.5; // Atraso para a lâmpada aparecer (após as letras)

	// Animação para o texto
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
	
	// Animação para a lâmpada
	if (lampContainer.value) {
		// Inicialmente escondida
		lampContainer.value.style.opacity = '0';
		lampContainer.value.style.transform = 'translateY(-30px)';
		
		// Animar após o delay
		setTimeout(() => {
			animate(lampContainer.value, {
				opacity: [0, 1],
				transform: ['translateY(-30px)', 'translateY(0)']
			}, {
				duration: 0.6,
				easing: 'ease-out'
			})
		}, (globalDelay + lampDelay) * 1000)
	}
})
</script>

<style scoped>
.secondary-text span {
	display: inline-block;
	opacity: 0; /* Inicialmente invisível */
	transform: translateY(20px); /* Inicialmente deslocado para baixo */
}
</style>
