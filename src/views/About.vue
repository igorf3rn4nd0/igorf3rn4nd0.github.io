<template>
	<section class="section">
		<article class="no-padding round">
			<img class="responsive medium top-round" src="/about.jpg">
			<div class="padding">
				<h5>Um pouco sobre mim</h5>
				<div class="padding large-text ">
						<p>🚀 6 anos focado em projetos de alta demanda.</p>
						<p>👨🏻‍🎓 Especializado em frontend com Vue e backend robusto com Java e .NET.</p>
						<p>💻 Apaixonado por boas práticas e performance.</p>
					</div>
			</div>
		</article>
		<!-- <article class="no-padding round" style="max-width: 50rem;">
			<div class="grid no-space">
				<div class="s12 m5">
					<img class="responsive round extra" src="/about.jpg">
					<div class="absolute top-round top left right large-padding white-text dark top-shadow">
						<h5>A estrada até aqui</h5>
					</div>
				</div>
				<div class="s12 m7 middle">
					<div class="padding large-text ">
						<p>🚀 6 anos focado em projetos de alta demanda.</p>
						<p>🧑🏼‍🎓 Especializado em frontend com Vue e backend robusto com Java e .NET.</p>
						<p>💻 Apaixonado por boas práticas e performance.</p>
					</div>
				</div>
			</div>
		</article> -->
		<!-- <article class="no-padding round">
			<img class="responsive small top-round" src="/about.jpg">
			<div class="padding">
				<h5>Um pouco sobre mim</h5>
				<p>🚀 6 anos focado em projetos de alta demanda.</p>
				<p>Especializado em frontend com Vue e backend robusto com Java e .NET.</p>
				<p>Apaixonado por boas práticas e performance.</p>
			</div>
		</article> -->
	</section>
</template>

<script setup>
import { ref } from 'vue'
const polygons = ref([
	{
		fill: '#cc0000',
		points: '957 450 539 900 1396 900'
	},
	{
		fill: '#aa0000',
		points: '957 450 872.9 900 1396 900'
	},
	{
		fill: '#d6002b',
		points: '-60 900 398 662 816 900'
	},
	{
		fill: '#b10022',
		points: '337 900 398 662 816 900'
	},
	{
		fill: '#d9004b',
		points: '1203 546 1552 900 876 900'
	},
	{
		fill: '#b2003d',
		points: '1203 546 1552 900 1162 900'
	},
	{
		fill: '#d3006c',
		points: '641 695 886 900 367 900'
	},
	{
		fill: '#ac0057',
		points: '587 900 641 695 886 900'
	},
	{
		fill: '#c4008c',
		points: '1710 900 1401 632 1096 900'
	},
	{
		fill: '#9e0071',
		points: '1710 900 1401 632 1365 900'
	},
	{
		fill: '#aa00aa',
		points: '1210 900 971 687 725 900'
	},
	{
		fill: '#880088',
		points: '943 900 1210 900 971 687'
	}
	
])
</script>

<style scoped>

</style>
