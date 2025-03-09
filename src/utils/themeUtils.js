const randomColor = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	console.log('chamou', color)
	return color
}

const setRandomThemeColor = () => {
  const color = randomColor()
	ui('theme', color)
}

const setTheme = (theme) => {
	ui('mode', theme)
}

export { randomColor, setTheme, setRandomThemeColor }
