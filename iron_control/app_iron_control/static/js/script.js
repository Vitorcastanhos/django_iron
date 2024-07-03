const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://aikodupxqtwmzfjnvryg.supabase.co";
const SUPABASE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpa29kdXB4cXR3bXpmam52cnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NjQ5MjYsImV4cCI6MjAzNTU0MDkyNn0.tb_fI1yj6D4FQW8QeJF1PRNenz9aLvaD_l-PTMrV3QU";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadInputs() {
	const { data, error } = await supabase.from("inputs").select("*");

	if (error) {
		console.error("Error loading inputs:", error);
		return;
	}

	if (data) {
		data.forEach((item) => {
			const input = document.getElementById(item.input_id);
			const timeSpan = document.getElementById(`time-${item.input_id.split("-")[1]}`);

			if (input && timeSpan) {
				input.value = item.value;
				input.style.borderColor = "var(--highlight-color)";

				timeSpan.textContent = item.time;
				timeSpan.style.color = "var(--highlight-color)";

				const elapsedTime = Date.now() - item.timestamp;
				if (elapsedTime < 3600000) {
					setTimeout(() => {
						timeSpan.style.color = "var(--alert-color)";
					}, 3600000 - elapsedTime);
				} else {
					timeSpan.style.color = "var(--alert-color)";
				}
			} else {
				console.error(`Elements not found for input_id: ${item.input_id}`);
			}
		});
	}
}

async function saveInput(inputId, value, time, timestamp) {
	const { data, error } = await supabase
		.from("inputs")
		.upsert([{ input_id: inputId, value: value, time: time, timestamp: timestamp }]);

	if (error) {
		console.error("Error saving input:", error);
	} else {
		console.log("Input saved successfully:", data);
	}
}

async function deleteInput(inputId) {
	const { data, error } = await supabase.from("inputs").delete().match({ input_id: inputId });

	if (error) {
		console.error("Error deleting input:", error);
	} else {
		console.log("Input deleted successfully:", data);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const inputs = document.querySelectorAll('input[type="number"]');

	loadInputs();

	inputs.forEach((input) => {
		input.addEventListener("input", async (event) => {
			input.style.borderColor = "var(--highlight-color)";
			const timeSpan = document.querySelector(`#time-${input.id.split("-")[1]}`);
			const currentTime = new Date().toLocaleTimeString();
			const timestamp = Date.now();

			if (input.value === "") {
				input.style.borderColor = "";
				timeSpan.textContent = "Disponível";
				timeSpan.style.color = "";

				await deleteInput(input.id);
			} else {
				timeSpan.textContent = `Emprestado às: ${currentTime}`;
				timeSpan.style.color = "var(--highlight-color)";

				await saveInput(input.id, input.value, timeSpan.textContent, timestamp);

				setTimeout(() => {
					timeSpan.style.color = "var(--alert-color)";
				}, 3600000);
			}
		});
	});
});
