import { Result } from "../types"

export default function ResultCard(props: { result: Result }) {
  const { result } = props
  const div = document.createElement('div')
  div.innerHTML = `<div class="bg-white rounded-lg shadow-md p-4">
            <h3 class="text-lg font-bold text-yellow-600">${result.title}</h3>
            <p class="text-sm text-gray-500 mb-2">from <a href="#" class="text-blue-500">${result.source}</a></p>
            <p class="text-sm text-gray-700">${result.ingredients.join(', ')}</p>
            <a href="#" class="mt-4 inline-block text-yellow-600 font-medium">Read Cooking Directions →</a>
          </div>`
  return div
}