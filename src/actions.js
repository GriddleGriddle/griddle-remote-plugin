import * as types from './constants';
import { GriddleActions } from './griddle-core';

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

export function filterData(response, filter) {
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

export function filterDataRemote(remoteConfig, tableState) {
  return makeRequest(remoteConfig, tableState, (response) => {
    return filterData(response, tableState.filter);
  });
}

export function setPageSize(response, pageSize) {
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

export function setPageSizeRemote(remoteConfig, tableState) {
  return makeRequest(remoteConfig, tableState, (response) => {
    return setPageSize(response, tableState.pageSize);
  });
}

export function sort(response, sortColumn) {
  return dispatch => {
    // Append the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_REPLACE_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Finish the sort.
    dispatch(GriddleActions.sort(sortColumn));
  };
}

export function sortRemote(remoteConfig, tableState) {
  return makeRequest(remoteConfig, tableState, (response) => {
    return sort(response, tableState.sortColumn);
  });
}

export function addSortColumn(response, sortColumn) {
  return dispatch => {
    // Append the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_REPLACE_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Finish the sort.
    dispatch(GriddleActions.addSortColumn(sortColumn));
  };
}

export function addSortColumnRemote(remoteConfig, tableState) {
  return makeRequest(remoteConfig, tableState, (response) => {
    return addSortColumn(response, tableState.sortColumn);
  });
}

export function loadNext(response) {
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

export function loadNextRemote(remoteConfig, tableState) {
  return makeRequest(remoteConfig, tableState, (response) => {
    return loadNext(response);
  });
}

export function loadPrevious(response) {
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

export function loadPreviousRemote(remoteConfig, tableState) {
  return makeRequest(remoteConfig, tableState, (response) => {
    return loadPrevious(response);
  });
}

export function loadPage(response) {
  return dispatch => {
    // Replace the data.
    dispatch({
      type: types.GRIDDLE_REMOTE_REPLACE_DATA,
      currentPage: response.page,
      maxPage: response.maxPage,
      data: response.data
    });

    // Load the specified page, now that we have the data.
    dispatch(GriddleActions.loadPage(response.page));
  };
}

export function loadPageRemote(remoteConfig, tableState) {
  return makeRequest(remoteConfig, tableState, (response) => {
    return loadPage(response);
  });
}
