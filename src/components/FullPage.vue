<template>
    <div class="fullpage-container">
      <section 
        v-for="(section, index) in sections" 
        :key="index" 
        :id="section.id"
        class="section" 
			>
        <slot :name="section.id"></slot>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'

  const props = defineProps({
    sections: {
      type: Array,
      required: true
    }
  })
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  defineExpose({ scrollToSection })
  
  onMounted(() => {
    window.addEventListener('wheel', (event) => {
      if (event.deltaY > 0) {
        const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        const currentSectionId = currentSection?.closest('section')?.id
        const currentIndex = props.sections.findIndex(section => section.id === currentSectionId)
        const nextSection = props.sections[currentIndex + 1]
        if (nextSection) {
          scrollToSection(nextSection.id)
        }
      }
    })
  })
  </script>
  
  <style scoped>
  .fullpage-container {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: 100vh;
  }
  
  .section {
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 2rem;
  }
  </style>
  