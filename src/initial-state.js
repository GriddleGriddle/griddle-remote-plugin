import Immutable from 'immutable';

export default function initialState(remoteProvider) {
  return Immutable.fromJS({
    totalItemCount: 0,
    loadsInProgress: 0,
    pagesLoaded: [],
    remoteProvider: remoteProvider
  });
};