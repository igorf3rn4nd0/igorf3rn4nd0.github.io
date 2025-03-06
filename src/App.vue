<template>
	<nav class="horizontal-padding  tiny-padding scroll" :class="{ 'left': greaterSm, 'bottom': !greaterSm }">
		<router-link 
			v-for="section in sections" 
			:key="section.id"
			:to="{ hash: '#' + section.id }"
			:class="{ 'active': currentSection === section.id }"
		>
			<i>{{ section.icon }}</i>
			<div class="m l">{{ section.title }}</div>
		</router-link>
	</nav>
	<main>
		<FullPage ref="fullPage" :sections="sections">
			<template v-slot:[section.id] v-for="section in sections" :key="section.id">
				<component :is="section.component" />
			</template>
		</FullPage>
		<div class="padding absolute top right">
			<button class="transparent circle" @click="toggleTheme">
				<i>{{ currentMode === 'dark' ? 'dark_mode' : 'light_mode' }}</i>
			</button>
  	</div>
	</main>
</template>

<script setup>
import FullPage from './components/FullPage.vue'
import { ref, onMounted, watch, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import { useBreakpoints } from './composables/useBreakpoints'


const { greaterSm } = useBreakpoints()
const route = useRoute()
const fullPage = ref(null)
const currentMode = ref('dark')
const sections = ref([
	{ id: 'home', title: 'Home', component: markRaw(Home), icon: 'home' },
	{ id: 'about', title: 'Sobre Mim', component: markRaw(About), icon: 'person' },
	{ id: 'services', title: 'Serviços', icon: 'share' },
	{ id: 'portfolio', title: 'Portfólio', icon: 'folder' },
	{ id: 'contact', title: 'Contato', icon: 'email' },
])

const currentSection = ref('home')

const toggleTheme = () => {
  currentMode.value = ui('mode')
  const newMode = currentMode.value === 'dark' ? 'light' : 'dark'
  ui('mode', newMode)
}

// Observa mudanças na hash da URL
watch(() => route.hash, (newHash) => {
	if (newHash) {
		const sectionId = newHash.slice(1)
		fullPage.value?.scrollToSection(sectionId)
	}
}, { immediate: true })

onMounted(() => {
	currentMode.value = ui('mode')
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
				const sectionId = entry.target.id
				currentSection.value = sectionId
				if (window.location.hash !== `#${sectionId}`) {
					window.history.replaceState(window.history.state, '', `#${sectionId}`)
				}
			}
		})
	}, {
		threshold: 0.5,
		rootMargin: '0px'
	})

	document.querySelectorAll('.section').forEach(section => {
		observer.observe(section)
	})
})
</script>

<style scoped>
</style>
