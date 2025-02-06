function Suggestion(props: { suggestion: string }): HTMLElement {
    const { suggestion } = props
    const element = document.createElement('li')
    
    element.classList.add('flex', 'items-center', 'justify-between', 'p-2', 'bg-gray-100', 'rounded-md', 'cursor-pointer')

    element.innerHTML = `
            <span>${suggestion}</span>
    `
    element.addEventListener('click', () => {
        const searchInput = document.getElementById('search') as HTMLInputElement
        searchInput.value = suggestion
        searchInput.dispatchEvent(new Event('input'))
    })
    console.log("Suggestion element created:", element)
    return element
}

export default function Suggestions(props: { suggestions: string[] }): HTMLElement {
    const { suggestions } = props
    const element = document.createElement('div')

    const ul = document.createElement('ul')
    ul.classList.add('grid', 'grid-cols-2', 'gap-2', 'sm:grid-cols-6')

    suggestions.forEach(suggestion => {
        const suggestionElement = Suggestion({ suggestion })
        ul.appendChild(suggestionElement)
    })

    element.appendChild(ul)
    console.log("Suggestions element created:", element)
    return element
}