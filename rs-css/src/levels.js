export const Levels = [
  {
    id: 1,
    title: 'London attractions',
    description: 'You have to select all attractions',
    selector: '*',
    isCompleted: false,
    code: `
      <attraction name="london-eye"></attraction>
      <attraction name="big-ben"></attraction>
      <attraction name="tower-bridge"></attraction>
      `
  },
  {
    id: 2,
    title: 'Just Big Ben',
    description: 'You have to select only big-ben element',
    selector: '[name="big-ben"]',
    isCompleted: false,
    code: `
      <attraction name="big-ben"></attraction>
      <attraction name="brandenburg-gate"></attraction>
      `
  },
  {
    id: 3,
    title: 'Unique city',
    description: 'You have to select element that have an id "stockholm-city"',
    selector: '#stockholm-city',
    isCompleted: false,
    code: `
      <city name="stockholm"></city>
      <city name="stockholm" id="stockholm-city"></city>
      <monument name="stonehenge"></monument>
      `
  },
  {
    id: 4,
    title: 'State of Liberty',
    description: 'You have to select element that have class "rotated"',
    selector: '.rotated',
    isCompleted: false,
    code: `
      <attraction name="statue-of-liberty"></attraction>
      <attraction name="statue-of-liberty" class="rotated"></attraction>
      <attraction name="san-francisco"></attraction>
      `
  },
  {
    id: 5,
    title: 'Rotated colesseum',
    description: 'You have to select one element',
    selector: '[name="colosseum"].rotated',
    isCompleted: false,
    code: `
      <attraction name="gateway-arch" class="rotated"></attraction>
      <attraction name="colosseum" class="rotated"></attraction>
      <attraction name="colosseum"></attraction>
      `
  },
  {
    id: 6,
    title: 'Attractions in the USA',
    description: 'You have to select attractions inside <usa> element',
    selector: 'usa attraction',
    isCompleted: false,
    code: `
      <usa>
        <attraction name="san-francisco"></attraction>
        <attraction name="statue-of-liberty"></attraction>
        <monument name="washington-monument"></monument>
      </usa>
      <attraction name="san-francisco"></attraction>
      <attraction name="washington-monument"></attraction>
      `
  },
  {
    id: 7,
    title: 'Towers',
    description: 'You have to select towers in Italy and Japan',
    selector: 'italy [name$="tower"], japan [name$="tower"]',
    isCompleted: false,
    code: `
      <italy>
        <attraction name="colosseum"></attraction>
        <attraction name="pisa-tower"></pisa-tower>
      </italy>
      <france>
        <attraction name="eiffel-tower"></attraction>
        <attraction name="louvre"></louvre>
      </france>
      <japan>
        <attraction name="fuji-mountain"></attraction>
        <attraction name="tokyo-tower"></attraction>
      </japan>
      `
  },
  {
    id: 8,
    title: 'Similar endings of city names',
    description: 'You have to select attractions that city name ends "n"',
    selector: 'attraction[city$="n"]',
    isCompleted: false,
    code: `
      <attraction name="brandenburg-gate" city="berlin"></attraction>
      <bridge name="tower-bridge" city="london"></bridge>
      <attraction name="eiffel-tower" city="paris"></attraction>
      <attraction name="big-ben" city="london"></attraction>
      <attraction name="gherkin" city="london"></attraction>
      `
  },
  {
    id: 9,
    title: 'Even attractions',
    description: 'You have to select only even attractions',
    selector: 'attraction:nth-child(2n)',
    isCompleted: false,
    code: `
        <attraction name="cn-tower"></attraction>
        <attraction name="stonehenge"></attraction>   
        <attraction name="fuji-mountain"></attraction>
        <attraction name="tokyo-tower"></attraction>
        <attraction name="christ-the-redeemer"></attraction>
      `
  },
  {
    id: 10,
    title: 'Ancient',
    description: 'You have to select not rotated attractions',
    selector: 'attraction:not(.rotated)',
    isCompleted: false,
    code: `
      <attraction name="athena"></attraction>
      <attraction name="wat-phra-kaew" class="rotated"></attraction>
      <pyramid name="aztec-pyramid"></pyramid>
      <attraction name="sphinx"></attraction>
      <attraction name="wat-phra-kaew"></attraction>
      `
  }
];
