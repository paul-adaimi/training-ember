export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  // server.createList('tag', 9);
  for (let item of ['Everything', 'Arts & Culture', 'Sports']) {
    server.create('tag', {
      title: item
    })
  }
  
  let event = server.create('event', {
    title: 'BIG CITY LIFE - Exhibition Opening'
  });
  event.createEventDate({
    date: '01-01-2020',
    startTime: '9:00am',
    endTime: '11:00pm'
  });

  event.createEventDate({
    date: '01-01-2021',
    startTime: '10:00am',
    endTime: '1:00pm'
  });
}
