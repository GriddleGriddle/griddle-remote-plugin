import Immutable from 'immutable';

export default function initialState(remoteProvider) {
  return Immutable.fromJS({
    pageProperties: {
      maxPage: 0
    },
    loadsInProgress: 0,
    pagesLoaded: [],
    remoteProvider: remoteProvider
  });
};