function hackerEffect(element) {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let splitText = element.innerText.split("");
	let body = document.querySelector("body");

	let iteration = 0;
	const interval = setInterval(() => {
		iteration += 1 / 2;
		if (iteration < splitText.length) {
			element.innerText = splitText
				.map((__, index) => {
					if (index < iteration + 1) {
						return splitText[index];
					}
					return letters[Math.floor(Math.random() * 26)];
				})
				.join("");
		} else {
			clearInterval(interval);
		}
	}, 30);
}

export { hackerEffect };
