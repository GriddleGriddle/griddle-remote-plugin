import * as actions from '../actions';

export function getTableState(store) {
  const state = store.getState();

  return {
    page: state.getIn(['pageProperties', 'currentPage']),
    pageSize: state.getIn(['pageProperties', 'pageSize']),
    filter: state.get('filter'),
    sortColumn: state.getIn(['pageProperties', 'sortColumns']),
    sortDirection: state.getIn(['pageProperties', 'sortAscending']) ? 'asc' : 'desc'
  };
}

export function getUpdatedSortDirection(store, sortColumn) {
  const state = store.getState();
  const sortColumns = state.getIn(['pageProperties', 'sortColumns']);

  // Default to ascending
  if (!sortColumns || !sortColumns.includes(sortColumn))
    return 'asc';

  // Flip the sort direction
  return state.getIn(['pageProperties', 'sortAscending']) ? 'desc' : 'asc';
}

export function getPagesLoaded(store) {
  const state = store.getState();

  return state.get('pagesLoaded');
}

export function getRemoteProvider(store) {
  const state = store.getState();

  return state.get('remoteProvider').toJS();
}