// function to filter items in a collection that are active, archived or 
export default function filterData(itemData, filterChoice) {

  let filteredData

  if (filterChoice === "active") {

    filteredData = itemData.filter((item) => item.is_active)
    // setItemDisplayData(filteredData)
    console.log("active filtering")

  } else if (filterChoice === "archived") {

    filteredData = itemData.filter((item) => !item.is_active)
    // setItemDisplayData(filteredData)
    console.log("archive filtering")

  } else if (filterChoice === "all") {

    filteredData = itemData
    // setItemDisplayData(itemData)
    console.log("no filtering - all items")

  } else {

    console.log("Error in filters. Filter chosen doesn't match any of the filter options. filterChoice = ", filterChoice)

  }

  return filteredData

}