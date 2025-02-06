import { Result } from "../types";
import ResultCard from "./ResultCard";


function Results(props: { results: Result[] }) {
    const { results } = props
    const resultsContainer = document.createElement('div')
    resultsContainer.classList.add("grid", "grid-cols-2", "gap-6")
    results.forEach(result => {
        const resultCard = ResultCard({ result })
        resultsContainer.appendChild(resultCard)
    })
    return resultsContainer
}

export default Results