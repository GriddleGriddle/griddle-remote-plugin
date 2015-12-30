import * as actions from './actions';
import * as constants from './constants';
import * as helpers from './helpers';
import * as reducers from './reducer';
import { default as initialState } from './initial-state';
import bindRemoteProvider from './util/bind-remote-provider';
//import combineRemoteActions from './util/combine-remote-actions';

// Remote providers
export * as superagentProvider from './providers/superagent-provider';

export function RemotePlugin(provider, remoteConfig) {
  const remoteProvider = bindRemoteProvider(provider, remoteConfig);
  return {
    name: 'GriddleRemote',
    actions: actions,
    storeBoundActions: [
      actions.initializeGrid,
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
    states: initialState(remoteProvider),
    reducers,
    components: {}
  };
};