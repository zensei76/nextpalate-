import MealsGrid from "@/components/meals/meals-grid";
import classes from "./page.module.css";
import Link from "next/link";

import { Suspense } from "react";
import { getMeals } from "@/lib/meals";


export const metadata = {
	title: "All Meals ",
	description: "Browse delicious palates shared by out NextPalate community.",
};

async function Meals() {
	const meals = await getMeals();

	return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
	return (
		<>
			<header>
				<h1>
					Delicious meals, created{" "}
					<span className={classes.highlight}>by you</span>
				</h1>
				<p>
					Choose your favorite recipe and cook it yourself , It's easy and
					fun!
				</p>
				<p className={classes.cta}>
					<Link href='/meals/share'>Share your Favorite Recipe</Link>
				</p>
			</header>
			<main className={classes.main}>
				<Suspense fallback={<p className={classes.loading}>Fecting meals...</p>}>
					<Meals />
				</Suspense>
			</main>
		</>
	);
}
