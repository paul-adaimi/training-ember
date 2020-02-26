import moment from 'moment';

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

  let startDate= moment("01-11-2020");
  let endDate = moment("03-08-2020");

  var range = endDate.diff(startDate, 'days');

  for(let i=0; i<range+1; i++){
    event.createEventDate({
      date: moment("01-11-2020").add(i,'days').calendar(),
      startTime: '9:00am',
      endTime: '11:00pm'
    });
  }
}
