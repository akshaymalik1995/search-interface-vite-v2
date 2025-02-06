import { Filter, Result } from "./types"
import Results from "./components/Results"
import FilterCheckboxList from "./components/FilterCheckboxList"
import { createFiltersFromResults } from "./components/utils"
import { $filters, $isSearchOn, $results, $selectedFilters, $suggestions } from "./state"
import Suggestions from "./components/Suggestions"

const BACKEND_URL = 'http://localhost:3000/recipes'

class App {

  constructor() {
    $isSearchOn.addListener(isSearchOn => {
      this.onSearchToggle(isSearchOn)
    })
    $results.addListener(results => this.addResultsToUI(results))
    $filters.addListener((filters) => this.addFiltersToUI(filters))
    $selectedFilters.addListener(selectedFilters => this.filterResults(selectedFilters))
    this.addEventListeners()
    $suggestions.addListener(suggestions => this.addSuggestionsToUI(suggestions))
    this.addSuggestionsToUI($suggestions.getValue())
  }

  addEventListeners() {
    this._addInputSearchListener()
  }

  private _addInputSearchListener() {
    console.log("addInputSearchListener is called")
    const searchInput = document.getElementById('search')!
    
    searchInput.addEventListener('input', (event: Event) => {
      const searchValue = (event.target as HTMLInputElement).value
      if (!searchValue) {
        $isSearchOn.set(false)
        $results.set([])
        return
      }
      this.fetchResults(searchValue)
    })
  }

  onSearchToggle(isSearchOn: boolean) {
    if (isSearchOn) {
      document.getElementById('search-results-container')!.classList.remove('hidden')
    } else {
      document.getElementById('search-results-container')!.classList.add('hidden')
    }
  }

  async fetchResults(searchValue: string): Promise<void> {
    const url = BACKEND_URL
    let formdata = new FormData();
    formdata.set("search_query", searchValue);
    let options = {"method":"POST", body:formdata}
    const response = await fetch(url, options)
    const response_json = await response.json()  // results keys is expected, other could be suggestions, search latency etc.
    console.log(response_json["results"].length)
    const suggestions = response_json["suggestions"][searchValue] || []
    $suggestions.set(suggestions)
    console.log(suggestions[searchValue])
    console.log(Object.keys(suggestions), searchValue)

    // current value in the search input
    const searchInput = document.getElementById('search')!
    let current_searchValue = (searchInput as HTMLInputElement).value
    if (current_searchValue.toLowerCase() !== searchValue.toLowerCase()){
      return;  // in case results are returned out of order! (this should be enough i guess!, one of the responses would always be correct one!!)
    }


    var results = [] // a collection of Result type/interface ?
    for (let i = 0; i <response_json["results"].length; i ++){
      results.push(response_json["results"][i]["document"])  // document key contains the specific dataset related info, rest are `matched_tokens` and `doc_id` !
    }
    const searchResults = results
    console.log(results)
    // const searchResults = results.filter((result: Result) => result.title.toLowerCase().includes(searchValue?.toLowerCase() || ''))
    
    $results.set(searchResults)
    $filters.set(createFiltersFromResults($results.getValue()))
    if (searchResults.length === 0) {
      $isSearchOn.set(false)
    } else {
      $isSearchOn.set(true)
    }
  }

  filterResults(filters: string[]) {
    const results = $results.getValue()
    if (filters.length === 0) {
      this.addResultsToUI(results)
      return
    }
    const filteredResults = results.filter(result => {
      return result.ingredients.some(ingredient => filters.includes(ingredient))
    })
    this.addResultsToUI(filteredResults)
  }

  addSuggestionsToUI(suggestions: string[]) {
    const suggestionsContainer = document.getElementById('suggestions')!
    suggestionsContainer.innerHTML = ''
    suggestionsContainer.appendChild(Suggestions({ suggestions }))
  }

  addFiltersToUI(filters: Filter[]) {
    const filtersContainer = document.getElementById('filters')!
    filtersContainer.innerHTML = ''
    filtersContainer.appendChild(FilterCheckboxList({ filters }))
  }

  addResultsToUI(results: Result[]) {
    const resultsContainer = document.getElementById('results')!
    resultsContainer.innerHTML = ''
    resultsContainer.appendChild(Results({ results }))
  }
}

new App()