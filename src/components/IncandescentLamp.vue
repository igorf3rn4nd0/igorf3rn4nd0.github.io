<template>
  <div class="lamp-container" @click="toggleLight">
    <div class="lamp">
      <img v-if="modelValue === 'light'" style="width: 30px;" src="/lamp-on.png" alt="Lamp">
      <img v-else style="width: 30px;" src="/lamp-off.png" alt="Lamp">
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineModel } from 'vue'
import { animate } from 'motion'

const emit = defineEmits(['toggle'])

const modelValue = defineModel('modelValue', { required: true })

const toggleLight = () => {
  const newMode = modelValue.value === 'dark' ? 'light' : 'dark'
	ui('mode', newMode)
  emit('toggle', newMode)
  modelValue.value = newMode
  animate('.lamp', { 
    rotate: [-10, 10, -5, 5, -2, 2, -1, 1, 0] 
  }, { 
    duration: 6,
    easing: 'ease-out'
  })
}
</script>

<style scoped>
.lamp-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.lamp {
  transform-origin: top center;
  width: 30px;
  transition: filter 0.3s ease;
  position: relative;
}

</style>