## :warning: Deprecated :warning:

###  Please find 1.0 updates in the [1.0-combined](https://github.com/GriddleGriddle/Griddle/tree/1.0-combined) branch.

# Griddle Remote Plugin (BETA)

The remote plugin provides a configurable way to load data that might not be available locally.

Install with `npm install griddle-remote-plugin` and import or require the
plugin. The remote plugin allows you to specify the request / response format,
as well as specify the provider used for loading data (such as `superagent` or
your own).

```
import { RemotePlugin, superagentProvider } from 'griddle-remote-plugin';
...
const optionalConfig = {...};
<Griddle ... plugins={[RemotePlugin(superagentProvider, remoteConfig)]}
```

## Configuration
At the moment, but `superagent` is the only remote provider available, but support for Axios is planned.

### Superagent Provider Config:
```
url, // The URL of your API : string
requestHeaders, // Any headers needed by your API endpoint : array
formatRequest, //  : function(superagentRequest, tableState)
formatSuccess, // : function(response, tableState)
formatError // : function(requestError, errorResponseBody)
```

The `tableState` param includes information about the state of the table that is being requested.
```
{
  page, // The page being requested : int
  pageSize, // The page size being requested : int
  filter, // The table filter : string
  sortColumn, // The sort columns : array
  sortDirection // The sort direction : string, 'asc' or 'desc'
}
```

Expected returned value from the `formatSuccess` function:
```
{ data, totalCount, page, maxPage }
```

#### Example config:
```
{
  url: 'http://swapi.co/api/planets/',
  formatSuccess: function(response, tableState) {
    const { page, pageSize } = tableState;
    // Update the response
    return {
      data: response.results,
      totalCount: response.count,
      page: page,
      maxPage: Math.ceil(response.count / pageSize)
    }
  }
}
```

## Planned Features
1. Error handling
1. Support for Axios
