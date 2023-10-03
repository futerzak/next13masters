import React from "react";


export function Loading() {
    return (
        <div className='mr-auto h-screen flex items-center justify-center' aria-busy="true">
            <span>Loading...</span>
        </div>
    );
}
