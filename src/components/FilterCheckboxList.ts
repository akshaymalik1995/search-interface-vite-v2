import { Filter } from "../types";
import FilterCheckbox from "./FilterCheckbox";

function FilterCheckboxList(props : {filters : Filter[]}) {
    const { filters } = props
    const filterCheckboxList = document.createElement('div')
    filters.forEach(filter => {
        const filterCheckbox = FilterCheckbox({ filter })
        filterCheckboxList.appendChild(filterCheckbox)
    })
    return filterCheckboxList
}

export default FilterCheckboxList