import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export default function Default() {
    return (
        <ClipLoader
            color={'#F9AB00'}
            loading={true}
            cssOverride={{
                display: "block",
                margin: "5% 0% 5% 300%",
                borderColor: "red",
            }}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}
