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
const persona = getPersona('0xaEB7897ADF9b1309D7EF2dca6f3F6aFb65358ABD')
```

```
{
  sex: 'male',
  name: {
    given: 'Satoshi',
    family: 'Nakamoto',
  },
  zodiac: 'libra'
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