import * as actions from '../actions';

export function getTableState(store) {
  const state = store.getState();

  return {
    page: state.getIn(['pageProperties', 'currentPage']),
    pageSize: state.getIn(['pageProperties', 'pageSize']),
    filter: state.get('filter'),
    sortColumn: state.getIn(['sortProperties', 'sortColumns']),
    sortDirection: state.getIn(['sortProperties', 'sortAscending']) ? 'asc' : 'desc'
  };
}

export function getPagesLoaded(store) {
  const state = store.getState();

  return state.get('pagesLoaded');
}

export function getRemoteProvider(store) {
  const state = store.getState();

  return state.get('remoteProvider').toJS();
}