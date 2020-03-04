export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = 'http://localhost:8080';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  this.get('/tags');

  this.get('/events', function(schema, { queryParams }) {
    let allEvents = schema.events.all();
    let allEventsArray = allEvents.models;

    let pageNumber = queryParams['page[number]'];
    let pageSize = queryParams['page[size]'];

    if (queryParams.tag === undefined) {
      return allEventsArray.splice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }

    let eventTagId = schema.tags.where({ title: queryParams.tag }).models[0].attrs.id;

    allEventsArray.forEach((event, i) => {
      if (!event.attrs.tagIds.includes(`${eventTagId}`)) {
        allEventsArray.splice(i, 1);
      }
    });

    allEventsArray.splice(0, (pageNumber - 1) * pageSize);
    allEventsArray.splice(pageSize, Infinity);

    return allEvents;
  });

  this.get('/events/:id', function(schema, request) {
    return schema.events.find(request.params.id);
  });

  this.patch('/events/:id');

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
}
