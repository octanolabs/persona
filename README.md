# Persona

Returns a base persona (name, sex & zodiac) for a given ubiq or ethereum address.

As an homage to Satoshi Nakamoto, all names (both given and family) are of a japanese origin.

*Life is for one generation; A good name is forever.*

### Install 

```
npm install @octano/persona
```

### Usage

```
import { getPersona } from '@octano/persona'
const persona = getPersona('0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58')
```

```
{
  success: true,
  sex: 'male',
  name: {
    given: 'Kiichi',
    family: 'Oshikawa',
  },
  zodiac: 'leo',
  version: 1
}
```

#### Sex

Determined by odd or even state of summed hash: 'male' or 'female'

#### Name

* __given:__ Determined using sex from a total of 512 male and 512 female first names. 
* __family:__ Determined from a total of 4096 last names.

#### Zodiac

one of the following

```
[
  'aquarius',
  'aries',
  'cancer',
  'capricorn',
  'gemini',
  'leo',
  'libra',
  'pisces',
  'sagittarius',
  'scorpio',
  'taurus',
  'virgo',
]
```

#### Error handling

```
import { getPersona } from '@octano/persona'
const persona = getPersona('NOT_A_VALID_ADDRESS')
```

```
{
  success: false,
  error: 'NOT_A_VALID_ADDRESS is not a valid Ubiq/Ethereum address'
}
```