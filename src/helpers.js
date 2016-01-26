import { GriddleHelpers } from 'griddle-core';

// Override of implementation from 'local-helpers'
export function getPageData(state, pageSize, currentPage) {
  const remoteDataIndex = state.get('pagesLoaded').indexOf(currentPage);
  return helpers.getDataSet(state).skip(pageSize * (remoteDataIndex)).take(pageSize);
}

// Override of implementation from 'local-helpers'
export function getPage(state, pageNumber) {
  return state.setIn(['pageProperties', 'currentPage'], pageNumber);
}

// Override of implementation from 'local-helpers'
export function getDataSet(state) {
  return state.get('data');
}

// Override of implementation from 'local-helpers'
export function getVisibleData(state) {
  //get the max page / current page and the current page of data
  const pageSize = state.getIn(['pageProperties', 'pageSize']);
  const currentPage = state.getIn(['pageProperties', 'currentPage']);
  const remoteDataIndex = state.get('pagesLoaded').indexOf(currentPage);
  const { getDataColumns, getVisibleDataColumns, getSortedColumns } = GriddleHelpers.data;

  const data = getDataSet(state).skip(pageSize * (remoteDataIndex)).take(pageSize);
  const columns = getDataColumns(state, data);
  return getVisibleDataColumns(getSortedColumns(data, columns), columns);
}

// Override of implementation from 'local-helpers'
export function getDataSetSize(state) {
  return state.get('totalItemCount');
}

// Override of implementation from 'local-helpers'
export function filterData(data, filter) {
  // Simply return the data.
  return data;
}

// Override of implementation from 'local-helpers'
export function getSortedData(data, columns, sortAscending = true) {
  // Simply return the data.
  return data;
}

// Override of implementation from 'local-helpers'
export function sortDataByColumns(state) {
  // Simply return the data.
  return state;
}