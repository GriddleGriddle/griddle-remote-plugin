import Immutable from 'immutable';

function updateData(data, pagesLoaded, state, action, helpers) {
  state = state.set('data', helpers.addKeyToRows(data))
              .setIn(['pageProperties', 'maxPage'], action.maxPage)
              .set('totalItemCount', action.totalCount)
              .set('pagesLoaded', pagesLoaded);

  return helpers.updateVisibleData(state);
}

export function GRIDDLE_START_LOADING(state, action, helpers) {
  return state.set('loadsInProgress', state.get('loadsInProgress') + 1)
              .set('loadError', false)
              .set('loading', true);
}

export function GRIDDLE_STOP_LOADING(state, action, helpers) {
  const loadsInProgress = state.get('loadsInProgress') - 1;
  const newLoadsInProgress = loadsInProgress >= 0 ? loadsInProgress : 0;
  return state.set('loadsInProgress', newLoadsInProgress)
              .set('loading', newLoadsInProgress !== 0);
}

export function GRIDDLE_REMOTE_REPLACE_DATA(state, action, helpers) {
  const tempState = state.setIn(['pageProperties', 'currentPage'], action.currentPage)
  return updateData(action.data, [action.currentPage], tempState, action, helpers);
}

export function GRIDDLE_REMOTE_APPEND_DATA(state, action, helpers) {
  const appendedData = state.get('data').concat(action.data);
  const loadedPages = state.get('pagesLoaded').concat(action.currentPage);

  return updateData(appendedData, loadedPages, state, action, helpers);
}

export function GRIDDLE_REMOTE_PREPEND_DATA(state, action, helpers) {
  const prependedData = action.data.concat(state.get('data'));
  const loadedPages = Immutable.fromJS([action.currentPage]).concat(state.get('pagesLoaded'));

  return updateData(prependedData, loadedPages, state, action, helpers);
}

export function GRIDDLE_REMOTE_ERROR(state, action, helpers) {
  const loadsInProgress = state.get('loadsInProgress') - 1;

  return state.set('loadError', true)
              .set('loadsInProgress', loadsInProgress >= 0 ? loadsInProgress : 0);
}