"use client";

import { CldImage } from "next-cloudinary";

export default function DisplayFoodImage({image , title}) {
	return (
		<CldImage fill src={image} alt={title} />
	);
}
