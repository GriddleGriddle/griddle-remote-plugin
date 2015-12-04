import * as actions from '../actions';

export default function bindRemoteProvider(provider, remoteConfig) {
  return {
    ...provider,
    makeRequest: provider.makeRequest.bind(null, remoteConfig)
  };
}