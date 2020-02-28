import moment from 'moment';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  // server.createList('tag', 9);

  let allTags=[];

  for (let item of ['Arts & Culture', 'Sports']) {

    let tempTag=server.create('tag',{
      title: item
    })
    allTags.push(tempTag);
  }

  let event = server.create('event', {
    title: 'BIG CITY LIFE - Exhibition Opening',
    location: 'Salon Beyrouth restaurant, Mohammed Abdel Baki street, Beirut, Lebanon',
    url:'www.facebook.com/Human-Lie-Detection-547…',
    tags:[allTags[0]],
    isFavorite:false,
    details:`A dance performance by Ali Chahrour
January 24 to 27, 2019 - Al Madina Theatre, Beirut

Night is a dance concert whose approach and aesthetics draw their inspiration from the dense archive of love and romance in classical Arabic poetry and from contemporary  stories of lovers and their cruel separation.

This work references stories from the cultural memory of the Levant and Mesopotamia among others, about the fate of lovers who challenged social and religious systems, and whose bodies were punished and sentenced to suffer the distance of separation as well as the hope of impossible reunions.

The performance records the vicissitudes of lovers and their resistance, leading up to the moment when they fall and fade away. The exhausted body succumbs, and with it falls every action and instrument/tools that the performers had carried throughout the show. The fall reveals the fragility of the lover/performer, and the frailty of all the methods and tools at his disposal. The stage becomes the battlefield after the battle, where the audience has just witnessed the death, or rather, the birth of its heroes.

Directed and choreographed by: Ali Chahrour / Performed by: Hala Omran, Aya Metwalli, Simona Abdallah, Sharif Sehnaoui and Ali Chahrour / Music by: Sharif Sehnaoui, Simona Abdallah and Aya Metwalli / Dramaturgy: Junaid Sarieddine

Text adaptation by: Hala Omran and Junaid Sarieddine / Light design and technical director: Guillaume Tesson / Sound design: Khyam Allami / Costumes: Ahmed Amer / Stage manager and Assistant Director: Haera Slim / Production Manager: Christel Salem and Haera Slim / Graphic design and Communications: be:kult / Poster and brochure photography.`
  });

  let event2 = server.create('event', {
    title: 'The Other',
    location: 'Sunflower - Douwar el Shams Beirut, Lebanon 4011',
    url:'www.github.com',
    tags:allTags,
    isFavorite:false,
    details:` DETAILS kejfhekhf kjhekfh kehf khfk hfkehf kehfkj hekfh kejfh ekfh kefh kehf hekfj hekf hekfh kehf kjehfeiu hwflfkfhlkdhfsifgkj sg fghkjksfbgislkjfgdn dfgneirgk ndfjgndfkgndfk gndfkgjdk ngk 2`
  });

  let startDate= moment("01-11-2020");
  let endDate = moment("03-08-2020");

  var range = endDate.diff(startDate, 'days');

  for(let i=0; i<range+1; i++){
    event2.createEventDate({
      date: moment("01-11-2020").add(i,'days').calendar(),
      startTime: '9:00am',
      endTime: '11:00pm'
    });

    event.createEventDate({
      date: moment("01-11-2020").add(i,'days').calendar(),
      startTime: '9:00am',
      endTime: '11:00pm'
    });
  }

  event.tags=allTags;




}
