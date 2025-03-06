<template>
	<div class="grid middle-align center-align">
		<div class="l3 space m l"></div>
		<div class="s12 m5 l3">
			<img class="circle responsive secondary-container" src="/profile.png" style="max-width: 100%; height: auto;">
		</div>
		<div class="s12 m5 l4" :class="{ 'left-align': greaterSm, 'center-align': !greaterSm }">
			<h2 class="primary-text">Igor Fernando</h2>
			<!-- <h5 class="secondary-text">Full Stack Developer</h5> -->
			<h6 class="secondary-text">Transformando ideias em soluções reais.</h6>
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
const { greaterSm } = useBreakpoints()

</script>
