import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss"; //for cross site server attack

const db = sql("meals.db");

export async function getMeals() {
	await new Promise((resolve, reject) => setTimeout(resolve, 2000));

	// throw new Error('Loading meals failded')
	return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
	return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); // using dynamic to avoid sql injections
}

export async function saveMeal(meal) {
	// Generate a slug for the meal's title and assign it to the meal object
	meal.slug = slugify(meal.title, { lower: true });

	// Sanitize the instructions to remove harmful content
	meal.instructions = xss(meal.instructions);

	// Extract the file extension from the image URL
	const extension = meal.image.name.split(".").pop();

	// Generate a unique filename for the image based on the meal details
	const fileName = `${meal.slug}by${meal.creator}.${extension}`;

	// Create a writable stream to save the image file
	const stream = fs.createWriteStream(`public/images/${fileName}`);

	// Convert the image data to a Buffer using arrayBuffer() method
	const bufferImage = await meal.image.arrayBuffer();

	// Write the image data to the file
	stream.write(Buffer.from(bufferImage), (error) => {
		if (error) throw new Error("Saving image failed");
	});

	meal.image = `/images/${fileName}`;

	db.prepare(
		`
		INSERT INTO meals
		  (title, summary, instructions, creator, creator_email, image, slug)
		VALUES (
		  @title,
		  @summary,
		  @instructions,
		  @creator,
		  @creator_email,
		  @image,
		  @slug
		)
	  `
	).run(meal);
}
