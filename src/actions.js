import * as types from './constants';
import getTableState from './util/get-table-state';
import { GriddleActions } from 'griddle-core';

export function remoteError(err, response) {
  // TODO: Include a little more information about this error.

  return {
    type: types.GRIDDLE_REMOTE_ERROR
  };
}

export function startLoading() {
  return {
    type: types.GRIDDLE_START_LOADING
  };
}

export function initializeGrid() {
  dispatch => {
    // Initialize the grid.
    dispatch(GriddleActions.initializeGrid());

    // Load the first page of results.
    dispatch(loadPage(1));
  }
}

export function filterData(store, filter) {
  const tableState = {
    ...getTableState(store),
    filter
  };

  return makeRequest(tableState, (response) => {
    return filterDataRemoteHandler(response, filter);
  });
}

export function filterDataRemoteHandler(response, filter) {
  return dispatch => {
    // Append the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_REPLACE_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Execute the filter.
    dispatch(GriddleActions.filterData(filter));
  };
}

export function setPageSize(store, pageSize) {
  const tableState = {
    ...getTableState(store),
    pageSize
  };

  return makeRequest(tableState, (response) => {
    return setPageSizeRemoteHandler(response, pageSize);
  });
}

export function setPageSizeRemoteHandler(response, pageSize) {
  return dispatch => {
    // Append the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_REPLACE_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Set the page size.
    dispatch(GriddleActions.setPageSize(pageSize));
  };
}

export function sort(store, column) {
  const tableState = {
    ...getTableState(store),
    column: [column]
  };

  return makeRequest(tableState, (response) => {
    return sortRemoteHandler(response, column);
  });
}

export function sortRemoteHandler(response, column) {
  return dispatch => {
    // Append the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_REPLACE_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Finish the sort.
    dispatch(GriddleActions.sort(column));
  };
}

export function addSortColumn(store, column) {
  let tableState = getTableState(store);
  tableState = {
    ...tableState,
    column: tableState.column.concat(column)
  };

  return makeRequest(tableState, (response) => {
    return addSortColumnRemoteHandler(response, column);
  });
}

export function addSortColumnRemoteHandler(response, column) {
  return dispatch => {
    // Append the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_REPLACE_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Finish the sort.
    dispatch(GriddleActions.addSortColumn(column));
  };
}

export function loadNext(store) {
  const tableState = getTableState(store);

  return makeRequest(tableState, (response) => {
    return loadNextRemoteHandler(response);
  });
}

export function loadNextRemoteHandler(response) {
  return dispatch => {
    // Append the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_APPEND_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Load the next page, now that we have the data.
    dispatch(GriddleActions.loadNext());
  }
}

export function loadPrevious(store) {
  const tableState = getTableState(store);

  return makeRequest(tableState, (response) => {
    return loadPreviousRemoteHandler(response);
  });
}

export function loadPreviousRemoteHandler(response) {
  return dispatch => {
    // Append the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_PREPEND_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Load the previous page, now that we have the data.
    dispatch(GriddleActions.loadPrevious());
  };
}

export function loadPage(store, number) {
  const tableState = {
    ...getTableState(store),
    page: number
  };

  return makeRequest(tableState, (response) => {
    return loadPageRemoteHandler(response, number);
  });
}


export function loadPageRemoteHandler(response, number) {
  return dispatch => {
    // Replace the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_REPLACE_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Load the specified page, now that we have the data.
    dispatch(GriddleActions.loadPage(number));
  };
}

