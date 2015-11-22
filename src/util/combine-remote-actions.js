import * as actions from '../actions';

export default function combineRemoteActions(provider, remoteConfig) {
  // bind the remote config the the provider's 'makeRequest' function.
  if (provider.makeRequest) {
    provider.makeRequest = provider.makeRequest.bind(null, remoteConfig);
  }

  // Send back the configured actions.
  return {
    makeRequest: function() {
      console.error('No provider has been configured. Please ensure that a provider has been passed in to the griddle-remote-plugin.');
    },
    ...actions,
    ...provider
  };
}