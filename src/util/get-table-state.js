import * as actions from '../actions';

export default function getTableState(store) {
  const state = store.getState();

  return {
    page: state.getIn(['pageProperties', 'currentPage']),
    pageSize: state.getIn(['pageProperties', 'pageSize']),
    filter: state.get('filter'),
    sortColumn: state.getIn(['sortProperties', 'sortColumns']),
    sortDirection: state.getIn(['sortProperties', 'sortAscending']) ? 'asc' : 'desc'
  };
}