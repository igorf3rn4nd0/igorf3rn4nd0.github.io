<template>
	<dialog id="dialog" :open="dialogOpen" class="left no-padding right-round auto-width dialog">
	</dialog>
	
	<Teleport to="#dialog" :disabled="greaterSm || !teleportReady">
		<nav v-if="greaterSm || dialogOpen" class="scroll tiny-padding" :class="{ 'left': greaterSm, 'drawer': !greaterSm }">
			<header class="s">
				<nav>
					<button class="transparent circle large" @click="dialogOpen = false">
						<i>close</i>
					</button>
				</nav>
			</header>
			<div class="m l tiny-space"></div>
			<router-link 
				v-for="{ name, title, icon } in sections" 
				:key="name"
				:to="{ name }"
				:class="{ 'active': route.name === name }"
				@click="dialogOpen = false"
			>
				<i>{{ icon }}</i>
				<div>{{ title }}</div>
			</router-link>
		</nav>
	</Teleport>

	<main ref="mainContainer">
		<div class="router-view-container">
			<router-view v-slot="{ Component }">
				<transition name="page-transition" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</main>
	<div class="s absolute top left small-padding">
		<button class="transparent circle no-margin" @click="dialogOpen = !dialogOpen">
			<i>menu</i>
		</button>
	</div>
</template>

<script setup>
import IncandescentLamp from './components/IncandescentLamp.vue'
import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
import { useBreakpoints } from './composables/useBreakpoints'
import { useRoute, useRouter } from 'vue-router'
import { setRandomThemeColor } from './utils/themeUtils'

const { greaterSm } = useBreakpoints()
const currentMode = ref('dark')
const mainContainer = ref(null)
const teleportReady = ref(false)
const dialogOpen = ref(false)
const sections = ref([
	{ name: 'home', title: 'Home', icon: 'home' },
	{ name: 'about', title: 'Sobre Mim', icon: 'person' },
	{ name: 'projects', title: 'Projetos', icon: 'folder' },
	{ name: 'services', title: 'Serviços', icon: 'share' },
	{ name: 'contact', title: 'Contato', icon: 'email' },
])

const route = useRoute()
const router = useRouter()

// Controle de navegação
let isNavigating = false
const cooldownTime = 800 // ms

const navigateToSection = (direction) => {	
	if (isNavigating) return
	
	const currentIndex = sections.value.findIndex(section => section.name === route.name)
	let targetIndex = currentIndex
	
	if (direction === 'next' && currentIndex < sections.value.length - 1) {
		targetIndex = currentIndex + 1
	} else if (direction === 'prev' && currentIndex > 0) {
		targetIndex = currentIndex - 1
	} else {
		return // Não há para onde navegar
	}
	
	if (targetIndex !== currentIndex) {
		isNavigating = true
		router.push({ name: sections.value[targetIndex].name })
		setTimeout(() => { isNavigating = false }, cooldownTime)
	}
}

// Variáveis para controle de toque
let touchStartY = 0
let touchStartX = 0
const minSwipeDistance = 50
const maxHorizontalVariance = 50 // Tolerância para movimento horizontal

// Manipuladores de eventos de toque
const handleTouchStart = (e) => {
	touchStartY = e.touches[0].clientY
	touchStartX = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
	if (isNavigating) return
	
	const touchEndY = e.changedTouches[0].clientY
	const touchEndX = e.changedTouches[0].clientX
	
	// Calcular distâncias
	const verticalDistance = touchStartY - touchEndY
	const horizontalDistance = Math.abs(touchStartX - touchEndX)
	
	// Verificar se o movimento foi principalmente vertical
	if (Math.abs(verticalDistance) > minSwipeDistance && horizontalDistance < maxHorizontalVariance) {
		navigateToSection(verticalDistance > 0 ? 'next' : 'prev')
	}
}

// Manipulador de eventos de roda do mouse
const handleWheel = (e) => {
	// Permitir scroll padrão na página inicial
	if (route.name === 'home' && e.deltaY < 0 && window.scrollY <= 0) {
		return;
	}
	
	e.preventDefault()
	if (!isNavigating) {
		navigateToSection(e.deltaY > 0 ? 'next' : 'prev')
	}
}

// Manipulador de eventos de teclado
const handleKeydown = (e) => {
	if (isNavigating) return
	
	if (e.key === 'ArrowDown' || e.key === 'PageDown') {
		e.preventDefault()
		navigateToSection('next')
	} else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
		e.preventDefault()
		navigateToSection('prev')
	}
}
/* 
const toggleTheme = () => {
	currentMode.value = ui('mode')
	const newMode = currentMode.value === 'dark' ? 'light' : 'dark'
	ui('mode', newMode)
	currentMode.value = ui('mode')
} */

onBeforeMount(() => {
	ui('mode', 'light')
	setRandomThemeColor()
})

onMounted(() => {
	// Ativar o teleport após a montagem do componente
	setTimeout(() => {
		teleportReady.value = true
	}, 100)
	
	// Adicionar eventos de toque
	mainContainer.value.addEventListener('touchstart', handleTouchStart, { passive: true })
	mainContainer.value.addEventListener('touchend', handleTouchEnd, { passive: true })
	
	// Adicionar evento de roda do mouse
	window.addEventListener('wheel', handleWheel, { passive: false })
	
	// Adicionar evento de teclado
	window.addEventListener('keydown', handleKeydown)
	
	// Impedir o scroll padrão apenas quando não estiver na página inicial
	document.body.style.overflow = route.name === 'home' ? 'auto' : 'hidden'
	
	// Observar mudanças na rota para atualizar o comportamento de scroll
	router.afterEach((to) => {
		document.body.style.overflow = to.name === 'home' ? 'auto' : 'hidden'
	})
})

onUnmounted(() => {
	// Remover eventos de toque
	mainContainer.value.removeEventListener('touchstart', handleTouchStart)
	mainContainer.value.removeEventListener('touchend', handleTouchEnd)
	
	// Remover evento de roda do mouse
	window.removeEventListener('wheel', handleWheel)
	
	// Remover evento de teclado
	window.removeEventListener('keydown', handleKeydown)
	
	// Restaurar o scroll padrão
	document.body.style.overflow = ''
})
</script>

<style scoped>
main {
	height: 100vh;
	width: 100%;
	overflow: hidden;
	position: relative;
}

.router-view-container {
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
}

/* Animações de transição de página */
.page-transition-enter-active,
.page-transition-leave-active {
	transition: transform 0.6s ease, opacity 0.6s ease;
}

.page-transition-enter-from {
	opacity: 0;
	transform: translateY(30px);
}

.page-transition-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}
</style>
