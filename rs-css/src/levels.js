export const Levels = [
  {
    id: 1,
    title: 'London attractions',
    description: 'You have to select all attractions',
    selector: '*',
    isCompleted: false,
    code: `
      <london-eye></london-eye>
      <big-ben></big-ben>
      <tower-bridge></tower-bridge>
      `
  },
  {
    id: 2,
    title: 'Just Big Ben',
    description: 'You have to select only big-ben element',
    selector: 'big-ben',
    isCompleted: false,
    code: `
      <big-ben></big-ben>
      <brandenburg-gate></brandenburg-gate>
      `
  },
  {
    id: 3,
    title: 'Unique city',
    description: 'You have to select element that have an id "stockholm-city"',
    selector: '#stockholm-city',
    isCompleted: false,
    code: `
      <stockholm></stockholm>
      <pisa-tower></pisa-tower>
      <stockholm id="stockholm-city"></stockholm>
      <stonehenge></stonehenge>
      `
  },
  {
    id: 4,
    title: 'State of Liberty',
    description: 'You have to select element that have class "rotated"',
    selector: '.rotated',
    isCompleted: false,
    code: `
      <statue-of-liberty></statue-of-liberty>
      <statue-of-liberty class="rotated"></statue-of-liberty>
      <san-francisco></san-francisco>
      `
  },
  {
    id: 5,
    title: 'Rotated colesseum',
    description: 'You have to select one element',
    selector: 'colosseum.rotated',
    isCompleted: false,
    code: `
      <gateway-arch class="rotated"></gateway-arch>
      <colosseum class="rotated"></colosseum>
      <colosseum></colosseum>
      `
  },
  {
    id: 6,
    title: 'Buildings in the USA',
    description: 'You have to select all elements inside <usa> element',
    selector: 'usa *',
    isCompleted: false,
    code: `
      <usa>
        <san-francisco></san-francisco>
        <statue-of-liberty></statue-of-liberty>
        <washington-monument></washington-monument>
      </usa>
      <san-francisco></san-francisco>
      <washington-monument></washington-monument>
      `
  },
  {
    id: 7,
    title: 'Too many attractions',
    description: 'You have to select only last attraction in each named coutry',
    selector: 'country[name] *:last-child',
    isCompleted: false,
    code: `
      <country>
        <colosseum></colosseum>
        <pisa-tower></pisa-tower>
      </country>
      <country name="france">
        <pantheon></pantheon>
        <louvre></louvre>
      </country>
      <country name="china">
        <forbidden-city></forbidden-city>
        <great-wall-of-china></great-wall-of-china>
      </country>
      `
  },
  {
    id: 8,
    title: 'Similar endings of city names',
    description: 'You have to select attractions that city name ends "n"',
    selector: '[city$="n"]',
    isCompleted: false,
    code: `
      <brandenburg-gate city="berlin"></brandenburg-gate>
      <eiffel-tower city="paris"></eiffel-tower>
      <burj-al-arab city="dubai"></burj-al-arab>
      <big-ben city="london"></big-ben>
      <gherkin city="london"></gherkin>
      `
  },
  {
    id: 9,
    title: 'Towers',
    description: 'You have to select only towers',
    selector: 'tower:nth-child(2n+1)',
    isCompleted: false,
    code: `
      <towers>
        <tower>
          <cn-tower></cn-tower>
        </tower>
        <tower>
          <stonehenge></stonehenge>
        </tower>
        <tower>
          <pisa-tower></pisa-tower>   
        </tower>
        <tower>
          <fuji-mountain></fuji-mountain>   
        </tower>
        <tower>
          <eiffel-tower></eiffel-tower>
        </tower>
        <tower>
          <christ-the-redeemer></christ-the-redeemer>
        </tower>
        <tower>
          <tokyo-tower></tokyo-tower>
        </tower>
      </towers>
      `
  },
  {
    id: 10,
    title: 'Ancient',
    description: 'You have to select not rotated elements',
    selector: ':not(.rotated)',
    isCompleted: false,
    code: `
      <athena></athena>
      <wat-phra-kaew class="rotated"></wat-phra-kaew>
      <sphinx></sphinx>
      <wat-phra-kaew></wat-phra-kaew>
      <aztec-pyramid></aztec-pyramid>
      `
  }
];
