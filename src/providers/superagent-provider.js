import request from 'superagent';

export function makeRequest (remoteConfig, tableState, successDispatch, remoteError) {
  return dispatch => {
    const { url, requestHeaders, formatRequest, formatSuccess, formatError } = remoteConfig;

    // Set up the request.
    let loadRequest = request.get(url);

    // If the   request needs to be constructed differently, pass to the override function.
    if (formatRequest) {
      loadRequest = formatRequest(loadRequest, tableState);
    } else {
      const { page, pageSize, filter, sortColumn, sortDirection } = tableState;

      // Add parameters
      loadRequest = loadRequest.query({ page: page,
                                        pageSize: pageSize,
                                        filter: filter,
                                        sortColumn: sortColumn,
                                        sortDirection: sortDirection });

      // Add any headers added to the remote config
      if (requestHeaders) {
        Object.keys(requestHeaders).forEach(key => {
          loadRequest = loadRequest.set(key, requestHeaders[key]);
        });
      }
    }

    loadRequest.end(function(err, res){
      if (res.ok) {
        let successResponse = res.body;

        // Format if necessary.
        if (formatSuccess) {
          successResponse = formatSuccess(successResponse);
        }

        // Dispatch the success
        dispatch(this.successDispatch);
      } else {
        let errorResponse = res.body;

        // Format if necessary
        if (formatError) {
          errorResponse = formatError(err, errorResponse);
        }

        // Dispatch the error
        dispatch(remoteError(err, errorResponse));
      }
    });
  }
}