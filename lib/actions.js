"use server";

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
	return !text || text.trim() === "";
}

// This function is exported as an asynchronous function named `shareMeal`.
export async function shareMeal(prevState, formData) {
	console.log("Form Data:", formData);
	// Constructing a `meal` object using data from the `formData` object.
	const meal = {
		title: formData.get("title"), // Extracted from the form data with the key `'title'`.
		summary: formData.get("summary"), // Extracted from the form data with the key `'summary'`.
		instructions: formData.get("instructions"), // Extracted from the form data with the key `'instructions'`.
		image: formData.get("image"), // Extracted from the form data with the key `'image'`.
		creator: formData.get("name"), // Extracted from the form data with the key `'name'`.
		creator_email: formData.get("email"), // Extracted from the form data with the key `'email'`.
	};

	// Checking the validity of the form data and the meal object.
	if (
		isInvalidText(meal.title) || // Checking if the title is empty or contains invalid text.
		isInvalidText(meal.summary) || // Checking if the summary is empty or contains invalid text.
		isInvalidText(meal.instructions) || // Checking if the instructions are empty or contain invalid text.
		isInvalidText(meal.creator) || // Checking if the creator name is empty or contains invalid text.
		isInvalidText(meal.creator_email) || // Checking if the creator email is empty or contains invalid text.
		!meal.creator_email.includes("@")
	) {
		// Returning an object with a message indicating invalid input if any of the checks fail.
		return {
			message: "Invalid input.",
		};
	}

	// Waiting for the `saveMeal` function to save the meal data.
	await saveMeal(meal);

	// Revalidating the path '/meals'. The purpose of this function is not clear from the provided code.
	revalidatePath("/meals");

	// Redirecting the user to the '/meals' page.
	redirect("/meals");
}
