import * from actions as '../actions';


export function combineRemoteActions(provider) {
  // Send back the configured actions.
  return {
    makeRequest: function() {
      console.error('No provider has been configured. Please ensure that a provider has been initialized via the griddle-remote-plugin\'s \'combineActions\' method.');
    },
    ...actions,
    ...provider
  };
}