import { useBreakpoints as useBreakpointsVueuse } from '@vueuse/core'

const useBreakpoints = () => {
  const breakpoints = useBreakpointsVueuse({
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  })

  return {
    greaterSm: breakpoints.greater('sm'),
    greaterMd: breakpoints.greater('md'),
    greaterLg: breakpoints.greater('lg'),
    greaterXl: breakpoints.greater('xl'),
    smallerSm: breakpoints.smaller('sm'),
    smallerMd: breakpoints.smaller('md'),
    smallerLg: breakpoints.smaller('lg'),
    smallerXl: breakpoints.smaller('xl'),
  }
}

export { useBreakpoints }
