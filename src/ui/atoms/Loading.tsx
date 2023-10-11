import React from "react";

export function Loading() {
	return (
		<div className="mr-auto flex h-screen items-center justify-center" aria-busy="true">
			<span>Loading...</span>
		</div>
	);
}
