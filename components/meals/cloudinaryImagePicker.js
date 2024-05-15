import { useRef, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import classes from "./image-picker.module.css";

export default function CloudinaryImagePicker({ label, name }) {
	const imageInput = useRef(); // Ref for the file input element

	// Function to handle successful image upload
	const handleUploadSuccess = (response) => {
		const public_id = response.info.public_id; // Extracting the public_id from the Cloudinary response
		console.log(`Upload successful. Public ID: ${public_id}`);

		// Update the name attribute of the input element
		imageInput.current.setAttribute("value", public_id);
	};

	// Function to handle failed image upload
	const handleUploadFailure = (error) => {
		console.error("Upload failed:", error);
	};

	return (
		<div className={classes.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={classes.controls}>
				{/* Input element for selecting an image file */}
				<input
					className={classes.input}
					id={name}
					accept='image/png, image/jpeg'
					name={name}
					ref={imageInput}
				/>
				{/* Button to trigger file input click */}
				<CldUploadButton
					className={classes.button}
					cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
					uploadPreset='nextpalate'
					onSuccess={handleUploadSuccess} // Handling upload success
					onFailure={handleUploadFailure} // Handling upload failure
				>
					<span>Pick an Image</span>
				</CldUploadButton>
			</div>
		</div>
	);
}
