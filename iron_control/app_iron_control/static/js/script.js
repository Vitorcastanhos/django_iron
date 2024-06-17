/**
 * Load saved data from localStorage and set the input values and styles accordingly.
 */
document.addEventListener("DOMContentLoaded", () => {
	// Get all input elements with type "number"
	const inputs = document.querySelectorAll('input[type="number"]');

	// Iterate over each input element
	inputs.forEach((input) => {
		// Get the input element's id
		const inputId = input.id;
		// Set the keys for data and time storage
		const key = `${inputId}-time`;
		const dataKey = `${inputId}-data`;

		// Get the saved value and time from localStorage
		const savedValue = localStorage.getItem(inputId);
		const savedTime = localStorage.getItem(key);

		// Set the input value and style if a saved value exists
		if (savedValue) {
			input.value = savedValue;
			input.style.borderColor = "red";
		}

		// Set the time span text and style if a saved time exists
		if (savedTime) {
			const timeSpan = document.getElementById(`time-${inputId.split("-")[1]}`);
			timeSpan.textContent = savedTime;
			timeSpan.style.color = "red";
		}

		// Event listener for keypress and input events
		input.addEventListener("keypress", handleKeypress);
		input.addEventListener("input", handleInput);

		/**
		 * Handle keypress event for input element.
		 * @param {Event} event - The keypress event.
		 */
		function handleKeypress(event) {
			// Check if the key pressed is a number and not a space
			if (!isNaN(event.key) && event.key !== " ") {
				// Set the input border color to red and update the time element
				input.style.borderColor = "red";
				const timeElement = document.getElementById(`time-${inputId.split("-")[1]}`);
				const currentTime = new Date().toLocaleTimeString();
				timeElement.textContent = `Emprestado às: ${currentTime}`;
				timeElement.style.color = "red";

				// Save data and time to localStorage
				localStorage.setItem(dataKey, input.value + event.key);
				localStorage.setItem(key, timeElement.textContent);
			}
		}

		/**
		 * Handle input event for input element.
		 */
		function handleInput() {
			// Get the time element
			const timeElement = document.getElementById(`time-${inputId.split("-")[1]}`);

			// Check if the input value is empty
			if (input.value === "") {
				// Reset the input border color, time element text, and style
				input.style.borderColor = "";
				timeElement.textContent = "Disponível";
				timeElement.style.color = "";

				// Remove data and time from localStorage
				localStorage.removeItem(dataKey);
				localStorage.removeItem(key);
			} else {
				// Update the localStorage with the current value
				localStorage.setItem(dataKey, input.value);
			}
		}
	});
});

