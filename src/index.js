import * as actions from './actions';
import * as constants from './constants';
import * as helpers from './helpers';
import * as reducers from './reducer';
import { default as initialState } from './initial-state';
import combineRemoteActions from './util/combine-remote-actions';

export function RemotePlugin(provider, remoteConfig) {
  return {
    name: 'GriddleRemote',
    actions: combineRemoteActions(provider, remoteConfig),
    storeBoundActions: [
      actions.filterData,
      actions.setPageSize,
      actions.sort,
      actions.addSortColumn,
      actions.loadNext,
      actions.loadPrevious,
      actions.loadPage
    ],
    constants,
    helpers: helpers,
    states: initialState,
    reducers,
    components: {}
  };
};

// Remote providers
export superagentProvider from './providers/superagent-provider';